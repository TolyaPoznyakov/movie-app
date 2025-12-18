<template>
  <UInputDate
      ref="inputDateRef"
      :model-value="modelValue"
      range
      @update:model-value="updateValue"
  >
    <template #trailing>
      <UPopover :reference="inputDateRef?.inputsRef[0]?.$el">
        <UButton
            color="neutral"
            variant="link"
            size="sm"
            icon="i-lucide-calendar"
            aria-label="Select a date range"
            class="px-0"
        />

        <template #content>
          <UCalendar
              :model-value="modelValue"
              class="p-2"
              :number-of-months="2"
              range
              @update:model-value="updateValue"
          />
        </template>
      </UPopover>
    </template>
  </UInputDate>
</template>

<script setup>
import { ref } from 'vue'

const _props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const inputDateRef = ref(null)

const updateValue = (val) => {
  emit('update:modelValue', val)
}
</script>
