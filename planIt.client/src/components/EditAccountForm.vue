<template>
  <div class="component">
    <div class="d-flex align-items-center justify-content-center mb-4">
      <img
        :src="account.picture"
        class="img-clamp border-primary border border-3"
        alt="account-picture"
      />
      <h4 class="ms-3">{{ account.name }}</h4>
    </div>
    <form
      @submit.prevent="editAccount"
      class="d-flex flex-column align-items-center"
    >
      <div>
        <input
          type="text"
          name="name"
          placeholder="name..."
          v-model="edit.name"
          required
          class="mx-2"
        />
        <input
          type="url"
          name="picture"
          placeholder="picture URL..."
          v-model="edit.picture"
          required
          class="mx-2"
        />
      </div>
      <div class="align-self-end d-flex mt-4">
        <button class="btn btn-danger" type="button" data-bs-dismiss="modal">
          Cancel
        </button>
        <button class="btn btn-primary mx-3" type="submit">Save</button>
      </div>
    </form>
  </div>
</template>


<script>
import { computed, ref } from '@vue/reactivity'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { accountService } from '../services/AccountService'
import { onMounted } from '@vue/runtime-core'
export default {
  setup() {
    const edit = ref({})
    const account = computed(() => AppState.account)
    onMounted(() => {
      edit.value = { ...account.value }
    })
    return {
      account,
      edit,
      async editAccount() {
        try {
          await accountService.editAccount()
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.img-clamp {
  max-height: 5em;
  border-radius: 50%;
}
</style>