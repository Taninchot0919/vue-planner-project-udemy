<template>
  <div class="home">
    <div v-if="projects.length">
      <div v-for="project in projects" :key="project.id">
        <single-project :project="project" @deleteProject="handleDelete"/>
      </div>
    </div>
  </div>
</template>

<script>
import SingleProject from '../components/SingleProject.vue';
export default {
  name: "Home",
  components: {SingleProject},
  data() {
    return {
      projects: [],
    };
  },
  mounted() {
    fetch("http://localhost:3000/projects")
      .then((res) => res.json())
      .then((data) => (this.projects = data))
      .catch((err) => console.log(err.message));
  },
  methods: {
    // รับ id เข้ามาอัตโนมัติ จาก event deleteProject
    handleDelete(id){
      // ถ้า id ที่รับเข้ามาไม่ตรงกับ project.id ให้เก็บไว้ (True) แต่ถ้าไม่ id ที่รับเข้ามาตรงกับ project.id ให้เอาออก (False)
      this.projects = this.projects.filter((project) => {
        // เนื่องด้วยบรรทัดข้างล่างนี้การจะเป็น true ได้ จะต้องมีค่า !=
        return project.id !== id
      })
    }
  },
};
</script>
