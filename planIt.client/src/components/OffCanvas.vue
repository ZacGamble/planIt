<template>
  <div class="offcanvas" tabindex="-1">
    <div class="offcanvas-header">
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
      <slot name="offcanvas-header-slot"></slot>
    </div>
    <div class="offcanvas-body">
      <slot name="offcanvas-body-slot"></slot>
    </div>
  </div>
</template>