<template>
  <form @submit.prevent="handleSubmit">
    <label>Title:</label>
    <input type="text" v-model="title" required />
    <label>Details:</label>
    <textarea v-model="details" required></textarea>
    <button>Update project</button>
  </form>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      title: "",
      details: "",
      uri: "http://localhost:3000/projects/" + this.id
    };
  },
  methods: {
    handleSubmit() {
      fetch(this.uri, {
        //   method สำหรับ patch put add delete ไม่มี s
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: this.title, details: this.details })
      })
        .then(console.log("CAN RUN"))
        .then(() => {
          this.$router.push("/");
        })
        .catch(err => console.log(err.message));
    }
  },
  mounted() {
    fetch(this.uri)
      // เพราะ res กลับมาไม่ใช่ json จึงต้องแปลงเป็น json ก่อน
      .then(res => res.json())
      .then(data => {
        console.log(data);
        // เพื่อให้มันลิ้งของเก่ากัน
        this.title = data.title;
        this.details = data.details;
      });
  }
};
</script>

<style>
</style>