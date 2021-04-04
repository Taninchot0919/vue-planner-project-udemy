<template>
  <!-- ถ้า project.complete เป็น True จะได้คลาสที่ชื่อว่า complete เพิ่มขึ้นมา -->
  <div class="project" :class="{ complete: project.complete }">
    <div class="actions">
      <h3 @click="toggleDetails">{{ project.title }}</h3>
      <div class="icon">
        <span class="material-icons"> edit </span>
        <span class="material-icons" @click="deleteProject"> delete </span>
        <span class="material-icons" @click="toggleCompleteProject">
          done
        </span>
      </div>
    </div>
    <div v-if="showDetails">
      <p>{{ project.details }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["project"],
  data() {
    return {
      showDetails: false,
      uri: "http://localhost:3000/projects/" + this.project.id,
    };
  },
  methods: {
    toggleDetails() {
      this.showDetails = !this.showDetails;
    },
    deleteProject() {
      // พอ fetch ไปแล้ว JSON Server จะรู้ว่าต้องลบเอง
      fetch(this.uri, { method: "DELETE" })
        .then(() => this.$emit("deleteProject", this.project.id))
        .catch((err) => console.log(err.message));
    },
    toggleCompleteProject() {
      fetch(this.uri, {
        //*** Patch ใน JSON or REST API คือการอัพเดทแค่ field เดียวแบบ just field เดียว
        method: "PATCH",
        //*** เป็นการบอกว่าที่เราจะส่งไปเนี่ยเราจะส่ง json ไปนะ
        headers: { "Content-Type": "application/json" },
        //*** stringify เหมือนเป็น method เปลี่ยน object ให้เป็น json string ทำให้เราสามารถส่ง json ผ่าน server และ client ได้
        body: JSON.stringify({ complete: !this.project.complete }),
      })
        // .then((result) => console.log(result))
        .then(() => {
          //   console.log("Can sent Emit");
          //   console.log(this.project.complete);
          this.$emit("updateProject", this.project.id);
        })
        .catch((err) => console.log(err.message));
    },
  },
};
</script>

<style>
.project {
  margin: 20px auto;
  background: white;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #e90074;
}
.material-icons {
  font-size: 24px;
  margin-left: 10px;
  color: #bbb;
  cursor: pointer;
}
.material-icons:hover {
  color: #777;
}
h3 {
  cursor: pointer;
}
.actions {
  /* ทำเป็น flex เพื่อให้สิ่งที่อยู่ภายใน div action นี้รวมเป็นบรรทัดเดียวกัน */
  display: flex;
  /* หมายความว่าสร้าง space ระหว่าง h3 กับ div ของ icon */
  justify-content: space-between;
  /* คือการทำให้อยู่บรรทัดเดียวกัน ตรงกลางของ div นับจากแนวตั้ง */
  align-items: center;
}
/* พอ project.complte เป็น true แล้วก็ให้มาทำ class นี้ก็คือจะให้กรอบด้านซ้ายเป็นสีเขียว */
.project.complete {
  border-left: 4px solid #00ce89;
}
</style>