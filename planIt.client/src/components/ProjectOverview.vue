<template>
    <div class="row mb-4">
        <div class="col-4">{{ project.name }}</div>
        <div class="col-4">{{ project.creator.picture }}</div>
        <div class="col-4">{{ project.createdAt }}</div>
    </div>
</template>

<script>
export default
{
    props:
    {
        project:
        {
            type: "Object",
            required: true
        }
    },

    setup()
    {
        return {
            
        }
    }
}
</script>

<style lang="scss" scoped>

</style>