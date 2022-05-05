<template>
  <div
    class="border border-primary border-2 rounded p-2 d-flex flex-column mb-3 position-relative"
  >
    <div class="d-flex align-items-center text-primary">
      <img
        :src="note.creator.picture"
        alt="owners picture"
        class="rounded-circle img-clamp"
      />
      <p class="my-0 ms-2">{{ note.creator.name }}</p>
    </div>
    <p class="p-1 my-0">{{ note.body }}</p>
    <i v-if="note.creator.id === accountId || projectCreatorId === accountId" class="mdi mdi-delete on-hover action text-primary-gradient position-absolute" @click="deleteNote"></i>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { notesService } from '../services/NotesService.js'
import Pop from '../utils/Pop.js'
import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js'
export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },

  setup(props) {
      const route = useRoute();
    return {
        accountId: computed(() => AppState.account.id),
        projectCreatorId: computed(() => AppState.activeProject.creatorId),
        async deleteNote()
        {
            try
            {
                if(await Pop.confirm())
                {
                    await notesService.deleteNote(props.note.id, route.params.id);
                    Pop.toast("Note deleted", "success")
                }
            }
            catch(error)
            {
                logger.error("[Note.vue > deleteNote()]", error.message);
                Pop.toast(error.message, "error");
            }
        }
    }
  }
}
</script>


<style lang="scss" scoped>
.img-clamp {
  max-height: 2.5em;
}

i{
    top: 0.5em;
    right: 0.7em;
}
</style>