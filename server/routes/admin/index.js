module.exports = app => {
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../../models/AdminUser')
    const Tea = require('../../models/Tea')
    const Article = require('../../models/Article')
    const Hero = require('../../models/Hero')

    const assert = require('http-assert')
    const router = express.Router({
        mergeParams: true
    })
    // 人脸识别接口
    const AipFaceClient = require("baidu-aip-sdk").face;
    const APP_ID = '24945657';
    const API_KEY = 'sZA0UCx54hiwGCOG3UOUSB48';
    const SECRET_KEY = 'LpotzHmHuDRieqwuwL93OLkO28BEsNUt';

    // 打点数据传输上限
    const maxTeaLength = 20;

    const client = new AipFaceClient(APP_ID, API_KEY, SECRET_KEY);

    // 在有序数组中插入正数并只保留前 n 个数字，最后返回是否插入成功
    const insertToSortedQueue = function (que, num, n) {
        console.log('num - ', num);
        if (num <= 0) {
            return false;
        }
        if (que.length < 1 || num < que[que.length - 1]) {
            que.push(num);
        } else {
            let i = 0;
            while (que[i] > num) { i++; }
            que.splice(i, 0, num);
        }
        if (que.length > n) {
            const lastNum = que[n - 1];
            while (que[que.length - 1] < lastNum) {
                que.pop();
            };
        }

        return true;
    }

    // 查询打点数据
    // 可按时间段查看
    const getTeaInfo = async (req, res) => {
        const { type } = req.query;
        const fromTime = new Date(req.query.fromTime);
        const toTime = new Date(req.query.toTime);
        console.log('Tea - ', req.query, fromTime, toTime);
        const ans = {};
        let total = 0;
        const amountQue = [];
        switch (type) {
            // 若查询首页访问，则返回按小时为key的访问量对象，{hour: amount}
            case 'Index': {
                console.log('Tea Index');
                const models = await Tea.aggregate([
                    {
                        $match: {
                            "type": type,
                            "time": { $gte: fromTime, $lte: toTime },
                        }
                    },
                    {
                        $group: {
                            "_id": { $hour: "$time" },
                            "amount": { $sum: 1 },
                        }
                    }
                ]);
                models.map(model => {
                    const hour = (model._id + 8) % 24;
                    total += model.amount;
                    ans[hour] = { amount: model.amount };
                })
                break;
            }
            // 若查询文章详情，则返回按文章oid为key的访问量对象，{viewedid: {title, amount}}
            case 'Article': {
                console.log('Tea Article');
                const articleModels = await Article.find({
                    "createdAt": { $lte: toTime },
                });
                for (let i = 0; i < articleModels.length; i++) {
                    const articleModel = articleModels[i];
                    const { _id, title } = articleModel;
                    const articleId = String(_id);
                    const models = await Tea.aggregate([
                        {
                            $match: {
                                "type": type,
                                "time": { $gte: fromTime, $lte: toTime },
                                "viewedid": articleId,
                            }
                        },
                        {
                            $group: {
                                "_id": "$viewedid",
                                "amount": { $sum: 1 },
                            }
                        }
                    ]);
                    let amount = 0;
                    if (models.length > 0) {
                        amount = models[0].amount;
                        total += amount;
                        const isInserted = insertToSortedQueue(amountQue, amount, maxTeaLength);
                        if (!isInserted) {
                            return;
                        }
                        ans[articleId] = {
                            title: title,
                            amount: amount,
                        };
                    }
                }

                break;
            }
            // 若查询英雄详情，则返回按英雄oid为key的访问量对象，{viewedid: {name, amount}}
            case 'Hero': {
                console.log('Tea Hero');
                const heroModels = await Hero.find();
                for (let i = 0; i < heroModels.length; i++) {
                    const heroModel = heroModels[i];
                    const { _id, name } = heroModel;
                    const heroId = String(_id);
                    const models = await Tea.aggregate([
                        {
                            $match: {
                                "type": type,
                                "time": { $gte: fromTime, $lte: toTime },
                                "viewedid": heroId,
                            }
                        },
                        {
                            $group: {
                                "_id": "$viewedid",
                                "amount": { $sum: 1 },
                            }
                        }
                    ]);
                    let amount = 0;
                    if (models.length > 0) {
                        amount = models[0].amount;
                        total += amount;
                        const isInserted = insertToSortedQueue(amountQue, amount, maxTeaLength);
                        if (!isInserted) {
                            return;
                        }
                        ans[heroId] = {
                            name: name,
                            amount: amount,
                        };
                    }
                }

                break;
            }
        }


        // 对于并列数量导致超出预期上限数量的，进行删去处理
        if (type !== 'Index' && amountQue.length > maxTeaLength) {
            let lastNum = amountQue[amountQue.length - 1];
            while (amountQue[amountQue.length - 1] <= lastNum) {
                amountQue.pop();
            };

            lastNum = amountQue[amountQue.length - 1];
            for (let i in ans) {
                if (ans[i].amount < lastNum) {
                    ans.delete(i);
                }
            };
        }

        // 计算不在上报内容中的其他部分占的比例
        let otherAmount = total;
        for (let i in ans) {
            console.log(ans[i]);
            const temp = Math.floor(ans[i].amount / total * 100);
            ans[i] = Object.assign(ans[i], {
                percent: temp,
            });
            otherAmount -= ans[i].amount;
        }
        if (type !== 'Index') {
            ans['moreItem'] = {
                amount: otherAmount,
                percent: Math.floor(otherAmount / total * 100),
            }
            const propertyName = type === 'Article' ? 'title' : 'name';
            ans.moreItem[propertyName] = '其他'
        }

        res.send(ans);
    }

    // 新增
    router.post('/', async (req, res) => {
        // console.log('新增 - ', req);
        // 通过req.Model自动识别模块并创建
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    // 更新id信息
    router.put('/:id', async (req, res) => {
        // 通过req.Model自动识别模块并更新
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send({
            success: true
        })
    })
    // 获取列表
    router.get('/', async (req, res) => {
        // console.log('get!');
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions)

        res.send(items)
    })
    // 获取id信息
    router.get('/:id', async (req, res) => {
        // console.log("get请求带id")

        if (req.Model.modelName === 'Tea') {
            getTeaInfo(req, res);
        } else {
            const model = await req.Model.findById(req.params.id)
            res.send(model)
        }
    })
    // 删除
    router.delete('/:id', async (req, res) => {
        const gruopId = 'admin'
        const id = req.params.id
        const userId = id
        // console.log("delete请求带id" + id)

        // 调用删除用户
        client.deleteUser(gruopId, userId).then(function (result) {
            // console.log(JSON.stringify(result));
        }).catch(function (err) {
            // 如果发生网络错误
            console.log(err);
        });
        await req.Model.findByIdAndDelete(id)
        res.send({
            success: true
        })
    })

    // 人脸识别模块
    // 新增、更新人脸
    router.post('/face', async (req, res) => {
        const { img: image, id } = req.body // 获取请求信息
        // 配置接口参数
        const imageType = 'BASE64'
        const gruopId = 'admin'
        const userId = id
        const options = {
            liveness_control: 'NORMAL',
            action_type: 'REPLACE',
        }
        let errMsg = '';
        let isUpdateSucc = false;
        // 调用人脸更新接口
        await client.addUser(image, imageType, gruopId, userId, options).then(function (result) {
            // console.log(JSON.stringify(result));
            if (result.error_code !== 0) {
                errMsg = result.error_msg
            } else {
                isUpdateSucc = true;
                res.send({
                    success: true,
                    result,
                })
            }
        }).catch(function (err) {
            // 如果发生网络错误
            console.log(err);
            res.send({
                success: false,
                err,
            })
        });
        assert(isUpdateSucc, 422, `人脸信息更新失败, 错误信息: ${errMsg}`); // 若出错则进行报错
    })
    // 获取id人脸
    // router.get('/face/:id', async (req, res) => {
    //     console.log("get请求带id")

    //     const model = await req.Model.findById(req.params.id)
    //     res.send(model)
    // })
    // 更新人脸
    // router.put('/face/', async (req, res) => {
    //     const { image, username } = req.body
    //     const imageType = 'BASE64'
    //     const gruopId = 'admin'
    //     const userId = username;
    //     const options = {
    //         liveness_control: 'LOW',
    //         action_type: 'REPLACE',
    //     }

    //     // 调用人脸检测
    //     client.addUser(image, imageType, gruopId, userId, options).then(function(result) {
    //         console.log(JSON.stringify(result));
    //         res.send({
    //             success: true,
    //             result,
    //         })           
    //     }).catch(function(err) {
    //         // 如果发生网络错误
    //         console.log(err);
    //         res.send({
    //             success: false,
    //             err,
    //         })
    //     });
    // })
    // 删除人脸库中对应用户
    // router.delete('/face/', async (req, res) => {
    //     const gruopId = 'admin'
    //     const userId = username

    //     // 调用删除用户
    //     client.deleteUser(gruopId, userId).then(function (result) {
    //         console.log(JSON.stringify(result));
    //     }).catch(function (err) {
    //         // 如果发生网络错误
    //         console.log(err);
    //         res.send({
    //             success: false,
    //             err,
    //         })
    //     });
    // })

    const authMiddleware = require('../../middleware/auth.js')

    // const resourceMiddleware = async (req, res, next) => {
    //     const modelName = require('inflection').classify(req.params.resource)
    //     req.Model = require(`../../models/${modelName}`)
    //     next()
    // }
    const resourceMiddleware = require('../../middleware/resource')
    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

    const multer = require('multer')
    const upload = multer({
        dest: __dirname + '/../../uploads'
    })
    app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    app.post('/admin/api/user', async (req, res) => {
        const { username } = req.body
        assert(username, 422, '未输入用户名')
        const user = await AdminUser.findOne({
            username
        })
        assert(!user, 422, '用户名已存在');
        res.send({
            isUsernameUnused: true,
        })
    })

    app.post('/admin/api/login', async (req, res) => {
        const {
            username,
            password = '',
            isFaced,
            img,
        } = req.body
        assert(username, 422, '未输入用户名')
        let isFacedValid = false
        let faceErr = '';
        // 根据用户名到数据库查找用户
        const user = await AdminUser.findOne({
            username
        }).select('+password')
        assert(user, 422, '用户不存在')
        // isFaced 为 true 表示正在使用人脸识别登录
        if (isFaced) {
            assert(img, 422, '未获取图片')
            // 配置接口
            const imageType = 'BASE64'
            const gruopIdList = 'admin'
            const options = {
                liveness_control: 'NORMAL',
                user_id: user.id,
            }
            // 请求人脸识别校验
            await client.search(img, imageType, gruopIdList, options).then(function (result) {
                // console.log(JSON.stringify(result));
                if (result.error_code !== 0) {
                    faceErr = result.error_msg; // 保存错误信息
                } else {
                    result.result.user_list.forEach(user => {
                        if (user.user_id === options.user_id) {
                            isFacedValid = true // 若通过则设置人脸识别校验成功
                        }
                    })
                }
            }).catch(function (err) {
                // 如果发生网络错误
                faceErr = err;
                console.log(err);
            });;
            assert(isFacedValid, 422, `人脸识别失败, 错误信息: ${faceErr}`);
        }
        // 若非人脸识别则校验密码
        const isValid = isFacedValid || require('bcrypt').compareSync(password, user.password)
        assert(isValid, 422, '密码错误')
        // 生成令牌
        const token = jwt.sign({
            id: user._id
        }, app.get('secret'));
        const auth = user.auth;
        // 返回结果
        res.send({
            token,
            auth,
        })
    })

    //错误处理函数
    app.use(async (err, req, res, next) => {
        res.status(err.status || 500).send({
            message: err.message
        })
        console.log(err)
    })
}