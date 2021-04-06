<template>
  <div class="home">
    <!-- $event รับข้อมูลมาจาก filterChange ( , by)-->
    <!-- Bind class ให้ส่ง currentFilter ไปทีื current ของ filterNav -->
    <filter-nav
      @filterChange="currentFilter = $event"
      :current="currentFilter"
    />
    <h2>Current Filter : {{ currentFilter }}</h2>
    <div v-if="projects.length">
      <div v-for="project in filteredProject" :key="project.id">
        <single-project
          :project="project"
          @deleteProject="handleDelete"
          @updateProject="handleComplete"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SingleProject from "../components/SingleProject.vue";
import FilterNav from "../components/FilterNav.vue";

export default {
  name: "Home",
  components: { SingleProject, FilterNav },
  data() {
    return {
      projects: [],
      currentFilter: "all"
    };
  },
  mounted() {
    fetch("http://localhost:3000/projects")
      .then(res => res.json())
      .then(data => (this.projects = data))
      .catch(err => console.log(err.message));
  },
  methods: {
    // รับ id เข้ามาอัตโนมัติ จาก event deleteProject
    handleDelete(id) {
      // ถ้า id ที่รับเข้ามาไม่ตรงกับ project.id ให้เก็บไว้ (True) แต่ถ้าไม่ id ที่รับเข้ามาตรงกับ project.id ให้เอาออก (False)
      this.projects = this.projects.filter(project => {
        // เนื่องด้วยบรรทัดข้างล่างนี้การจะเป็น true ได้ จะต้องมีค่า !=
        // เก็บค่าที่ไม่ตรงไว้
        return project.id !== id;
      });
    },
    handleComplete(id) {
      // หาก project แต่ละตัวมี id ที่รับเข้ามาตรงกับของตัวเอง ให้ toggle complete
      let p = this.projects.find(project => {
        return project.id === id;
      });
      p.complete = !p.complete;
      // console.log(p)
    }
  },
  computed: {
    filteredProject() {
      if(this.currentFilter === 'complete'){
        // เอาเฉพาะ project ที่มีค่า project.complete เป็น true
        return this.projects.filter(project => project.complete)
      }
      if(this.currentFilter === 'ongoing'){
        // เอาเฉพาะ project ที่มีค่า project.complete เป็น false
        return this.projects.filter(project => !project.complete)
      }
      return this.projects;
    }
  }
};
</script>
