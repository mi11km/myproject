<template>
    <div id="imageList">
        <div class="container">
            <div v-for="post in posts" :key="post.id">
                <img :src="'http://127.0.0.1:8000' + post.image" class="img">
            </div>
        </div>
        <hr>
        <h3>画像を追加</h3>
        <ImageUpload></ImageUpload>
    </div>
</template>

<script>
    import api from "../../plugins/api";
    import ImageUpload from "./ImageUpload";

    export default {
        name: "ImageList",
        data() {
            return {
                posts: [],
            };
        },
        created() {
            const clubId = this.$store.getters["club/authClubId"];
            api.get(`/club/${clubId}/image/`).then((response) => {
                this.posts = response.data;
                console.log(this.posts);
            });
        },
        components: {
            ImageUpload,
        },
    };
</script>

<style scoped>
    .container {
        display: flex;
        flex-wrap: wrap;
    }

    .img {
        width: 240px;
        margin: 8px;
        border-radius: 2%;
    }
</style>
