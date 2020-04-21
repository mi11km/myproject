<template>
    <div id="imageUpload">
        <p id="error" v-show="error">{{ error }}</p>

        <label>
            <img :src="previewSrc" alt="uploadImage" height="200px"/>
            <div>
                <input type="file" accept="image/*" @change="onImageChange"/>
            </div>
        </label>
        <button @click="upload()">アップロード</button>

        <p>{{ message }}</p>
    </div>
</template>

<script>
    import api from "../../plugins/api";

    export default {
        name: "ImageUpload",
        data() {
            return {
                uploadImage: null,
                previewSrc: "",
                message: "",
                error: "",
            };
        },
        created() {
            this.clearData();
        },
        methods: {
            setError(error, text) {
                this.error =
                    (error.response && error.response.data && error.response.data.error) ||
                    text;
            },
            getBase64(file) {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = (error) => reject(error);
                });
            },
            onImageChange(e) {
                const images = e.target.files || e.dataTransfer.files;
                this.uploadImage = images[0];
                this.getBase64(images[0])
                    .then((image) => {
                        this.previewSrc = image;
                    })
                    .catch((error) =>
                        this.setError(error, "画像のアップロードに失敗しました。")
                    );
            },
            upload() {
                if (this.uploadImage) {
                    /* postで画像を送る処理をここに書く */
                    const clubId = this.$store.getters["club/authClubId"]
                    const params = new FormData();
                    params.append("club", clubId);
                    params.append("image", this.uploadImage);
                    console.log(params)
                    api
                        .post(`/club/${clubId}/image/`, params)
                        .then((response) => {
                            console.log(response);
                        })
                        .catch((error) => {
                            console.log(error.response);
                        });
                    this.message = "アップロードしました";
                    this.error = "";
                } else {
                    this.error = "画像がありません";
                }
            },
            clearData() {
                this.uploadImage = null;
                this.previewSrc = "";
                this.message = "";
                this.error = "";
            },
        },
    };
</script>

<style scoped>
    #error {
        color: red;
    }
</style>
