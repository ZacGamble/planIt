<template>
    <div class="d-flex h-100 w-100 justify-content-center align-items-center">
        <div class="position-relative loading">
            <div class="circle circle-1"></div>
            <div class="circle circle-2"></div>
            <div class="circle circle-3"></div>
            <div class="circle circle-4"></div>
            <div class="circle circle-5"></div>
            <div class="circle circle-6"></div>
            <div class="circle circle-7"></div>
            <div class="circle circle-8"></div>
    </div>
    </div>
</template>

<script>
export default
{
    setup()
    {
        return {
            
        }
    }
}
</script>

<style lang="scss" scoped>

.loading
{
    animation-name: loadingspin;
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
}

@keyframes loadingspin
{
    0% { transform: rotate(0deg); }
    25% { transform: rotate(90deg); }
    50% { transform: rotate(180deg); }
    75% { transform: rotate(270deg); }
    100% { transform: rotate(360deg); }
}

.circle
{
    border-radius: 50%;
    height: 16px;
    width: 16px;
    position: absolute;
}
.circle-1
{
    background-color: #444;
    top: -56px;
    left: -8px;
}

.circle-2
{
    background-color: #555;
    top: -41.94px;
    left: -41.94px;
}

.circle-3
{
    background-color: #666;
    top: -8px;
    left: -56px;
}

.circle-4
{
    background-color: #777;
    top: 25.94px;
    left: -41.94px;
}

.circle-5
{
    background-color: #888;
    top: 40px;
    left: -8px;
}

.circle-6
{
    background-color: #999;
    top: 25.94px;
    left: 25.94px;
}

.circle-7
{
    background-color: #AAA;
    top: -8px;
    left: 40px;
}

.circle-8
{
    background-color: #BBB;
    top: -41.94px;
    left: 25.94px;
}

</style>