<template>
  <div class="boundary flex-grow-1">
    <div
      class="
        container
        home-card
        p-5
        bg-white
        rounded
        elevation-3
        projects-container
      "
    >
      <div class="row">
        <div class="col-md-10">
          <h3>Projects</h3>
          <p class="fs-4">A list of all the projects for "YOU"</p>
        </div>
        <div class="col-md-2">
          <button class="btn btn-outline-primary">Create Project</button>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-md-4">
          <h5>NAME</h5>
        </div>
        <div class="col-md-4">
          <h5>MEMBERS</h5>
        </div>
        <div class="col-md-4">STARTED</div>
      </div>
      <hr />
      <!-- COMPONENT HERE -->
      <h1 class="my-5 bg-secondary text-white p-3 rounded text-center">
        planIt
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped lang="scss">
.boundary {
  padding: 5em;
}
.projects-container {
  filter: drop-shadow(1em 0.8em 10px rgb(53, 49, 49));
  flex-grow: 1;
}
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
