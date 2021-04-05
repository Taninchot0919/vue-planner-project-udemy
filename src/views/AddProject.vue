<template>
  <form @submit.prevent="handleSubmit">
    <label>Title:</label>
    <input type="text" v-model="title" required />
    <label>Details:</label>
    <textarea v-model="details" required></textarea>
    <button>Add project</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      details: ""
    };
  },
  methods: {
    handleSubmit() {
      console.log(this.title + " And " + this.details);
      let newProject = {
        //   สำหรับ JSON server ไม่จำเป์็นต้องใส่ id เพราะ JSON Server สามารถ gen id ให้มีค่าต่างกันได้เลย
        title: this.title,
        details: this.details,
        complete: false
      };
      // console.log(newProject)
      // ** สำหรับ method post ไม่จำเป็นต้องใส่ / ต่ออีก
      fetch("http://localhost:3000/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // แปลง Object ให้เป็น JSON
        body: JSON.stringify(newProject)
      }).then(() => {
        // เพื่อให้ผู้ใช้กด add เสร็จแล้วกลับไปหน้า home
        this.$router.push("/");
      }).catch((err) => console.log(err.message));
    }
  }
};
</script>

<style>
form {
  background: white;
  padding: 20px;
  border-radius: 10px;
}
label {
  display: block;
  color: #bbb;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
  margin: 20px 0 10px 0;
}
input {
  padding: 10px;
  border: 0;
  border-bottom: 1px solid #ddd;
  width: 100%;
  box-sizing: border-box;
}
textarea {
  border: 1px solid #ddd;
  padding: 10px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
form button {
  display: block;
  margin: 20px auto 0;
  background: #00ce89;
  color: white;
  padding: 10px;
  border: 0;
  border-radius: 6px;
  font-size: 16px;
}
</style>