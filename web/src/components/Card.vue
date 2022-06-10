<template>
    <div class="bg-white card info-card">
        <div class="d-flex flex-wrap card-header ai-center">
            <i class="iconfont" :class="`icon-${icon}`"></i>
            <div class="ml-2">
                <strong>{{title}}</strong>
            </div>
        </div>
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss">
    @import "../assets/scss/_variables.scss";

    .card {
        .card-header {
            border-bottom: 1px solid $border-color;
            padding-bottom: 0.3rem;
            font-size: 0.32rem;
        }
    }
    
    .info-card {
        margin-top: 0.5rem;
        padding: 0.5rem;
    }
</style>

<script>
    export default {
        props: {
            title: {
                type: String,
                required: true
            },
            icon: {
                type: String,
                required: true
            },
        }
    }
</script>