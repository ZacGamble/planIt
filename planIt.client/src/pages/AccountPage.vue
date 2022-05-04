<template>
  <div class="d-flex flex-column align-items-center">
    <div class="about text-center">
      <h1>Welcome {{ account.name }}</h1>
      <img class="rounded" :src="account.picture" alt="" />
      <p>{{ account.email }}</p>
    </div>
    <hr />
    <div>
      <form v-on="submit">
        <div class="d-flex flex-column">
          <label for="title">Title</label>
          <input
            type="text"
            placeholder="title..."
            name="title"
            aria-label="account owner title"
            v-model="email"
          />
          <label for="name">Name</label>
          <input
            type="text"
            name="name"
            aria-label="account owener name"
            placeholder="name..."
          />
          <label for="email">Email</label>
          <input type="url" placeholder="email..." />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Account',
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
