<template>
    <div class="flex gap-2">
        <va-icon class="" :name="tPropIconName" :color="tPropIconColor" />
        <p>{{ tPropMessage }}</p>
    </div>
</template>


<script setup>

defineProps({
    tPropMessage: String,
    tPropIconName: String,
    tPropIconColor: String
})


</script>