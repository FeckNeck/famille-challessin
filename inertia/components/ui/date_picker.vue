<script setup lang="ts">
import {
  DatePicker,
  DatePickerRootProps,
  DatePickerRootEmits,
  useForwardPropsEmits,
} from '@ark-ui/vue'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import Input from './input.vue'

const props = withDefaults(defineProps<DatePickerRootProps>(), {
  positioning: {
    sameWidth: true,
  },
  startOfWeek: 1,
})

const emits = defineEmits<DatePickerRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DatePicker.Root v-bind="forwarded" locale="fr-FR">
    <DatePicker.Control>
      <DatePicker.Input asChild>
        <input />
      </DatePicker.Input>
      <DatePicker.Trigger>
        <Calendar :size="20" />
      </DatePicker.Trigger>
    </DatePicker.Control>
    <DatePicker.Positioner>
      <DatePicker.Content>
        <DatePicker.View view="day">
          <DatePicker.Context v-slot="api">
            <DatePicker.ViewControl>
              <DatePicker.PrevTrigger>
                <ChevronLeft :size="16" />
              </DatePicker.PrevTrigger>
              <DatePicker.ViewTrigger>
                <DatePicker.RangeText />
              </DatePicker.ViewTrigger>
              <DatePicker.NextTrigger>
                <ChevronRight :size="16" />
              </DatePicker.NextTrigger>
            </DatePicker.ViewControl>
            <DatePicker.Table>
              <DatePicker.TableHead>
                <DatePicker.TableRow>
                  <DatePicker.TableHeader v-for="(weekDay, id) in api.weekDays" :key="id">
                    {{ weekDay.narrow }}
                  </DatePicker.TableHeader>
                </DatePicker.TableRow>
              </DatePicker.TableHead>
              <DatePicker.TableBody>
                <DatePicker.TableRow v-for="(week, id) in api.weeks" :key="id">
                  <DatePicker.TableCell v-for="(day, id) in week" :key="id" :value="day">
                    <DatePicker.TableCellTrigger>{{ day.day }}</DatePicker.TableCellTrigger>
                  </DatePicker.TableCell>
                </DatePicker.TableRow>
              </DatePicker.TableBody>
            </DatePicker.Table>
          </DatePicker.Context>
        </DatePicker.View>
        <DatePicker.View view="month">
          <DatePicker.Context v-slot="api">
            <DatePicker.ViewControl>
              <DatePicker.PrevTrigger>
                <ChevronLeft :size="16" />
              </DatePicker.PrevTrigger>
              <DatePicker.ViewTrigger>
                <DatePicker.RangeText />
              </DatePicker.ViewTrigger>
              <DatePicker.NextTrigger>
                <ChevronRight :size="16" />
              </DatePicker.NextTrigger>
            </DatePicker.ViewControl>
            <DatePicker.Table>
              <DatePicker.TableBody>
                <DatePicker.TableRow
                  v-for="(months, id) in api.getMonthsGrid({ columns: 4, format: 'short' })"
                  :key="id"
                >
                  <DatePicker.TableCell
                    v-for="(month, id) in months"
                    :key="id"
                    :value="month.value"
                  >
                    <DatePicker.TableCellTrigger>{{ month.label }}</DatePicker.TableCellTrigger>
                  </DatePicker.TableCell>
                </DatePicker.TableRow>
              </DatePicker.TableBody>
            </DatePicker.Table>
          </DatePicker.Context>
        </DatePicker.View>
        <DatePicker.View view="year">
          <DatePicker.Context v-slot="api">
            <DatePicker.ViewControl>
              <DatePicker.PrevTrigger>
                <ChevronLeft :size="16" />
              </DatePicker.PrevTrigger>
              <DatePicker.ViewTrigger>
                <DatePicker.RangeText />
              </DatePicker.ViewTrigger>
              <DatePicker.NextTrigger>
                <ChevronRight :size="16" />
              </DatePicker.NextTrigger>
            </DatePicker.ViewControl>
            <DatePicker.Table>
              <DatePicker.TableBody>
                <DatePicker.TableRow
                  v-for="(years, id) in api.getYearsGrid({ columns: 4 })"
                  :key="id"
                >
                  <DatePicker.TableCell v-for="(year, id) in years" :key="id" :value="year.value">
                    <DatePicker.TableCellTrigger>{{ year.label }}</DatePicker.TableCellTrigger>
                  </DatePicker.TableCell>
                </DatePicker.TableRow>
              </DatePicker.TableBody>
            </DatePicker.Table>
          </DatePicker.Context>
        </DatePicker.View>
      </DatePicker.Content>
    </DatePicker.Positioner>
  </DatePicker.Root>
</template>

<style scoped>
[data-scope='date-picker'][data-part='input'] {
  width: 100%;
  padding: 0.5rem;
  background-color: var(--white);
  border: 2px solid var(--gray-800);
  outline: none;

  &::placeholder {
    color: var(--gray-500);
  }
}

[data-scope='date-picker'][data-part='input'][data-state='open'] {
  box-shadow: var(--shadow-tiny);
}

[data-scope='date-picker'][data-part='content'] {
  border: 2px solid var(--gray-800);
  padding: 1rem;
  min-width: 320px;
  background: var(--white);
  border-radius: var(--rounded);
}

[data-scope='date-picker'][data-part='control'] {
  display: flex;
  gap: 0.5rem;
}

[data-scope='date-picker'][data-part='prev-trigger'],
[data-scope='date-picker'][data-part='next-trigger'] {
  border: 0;
  background: none;
  cursor: pointer;
  padding: 8px;
  border-radius: var(--rounded-sm);

  &:hover {
    background: var(--yellow-300);
  }
}

[data-scope='date-picker'][data-part='table-cell-trigger'] {
  padding: 4px;
  min-width: 30px;
  min-height: 30px;
  border-radius: var(--rounded-sm);
  text-align: center;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

[data-scope='date-picker'][data-part='table-cell-trigger'][data-view='month'] {
  text-transform: capitalize;
}

[data-scope='date-picker'][data-part='table-cell-trigger']:hover {
  background: var(--yellow-300);
}

[data-scope='date-picker'][data-part='table-cell-trigger'][data-focus] {
  background: var(--yellow-300);
}

[data-scope='date-picker'][data-part='table-cell-trigger'][data-outside-range] {
  visibility: hidden;
}

[data-scope='date-picker'][data-part='table-cell-trigger'][data-selected] {
  background: var(--yellow-300) !important;
}

[data-scope='date-picker'][data-part='table-cell-trigger'][data-in-range]:not([data-selected]) {
  background: var(--yellow-300);
}

[data-scope='date-picker'][data-part='table-cell-trigger'][data-today] {
  font-weight: bold;
}

[data-scope='date-picker'][data-part='table-cell-trigger'][data-unavailable] {
  text-decoration: line-through;
  opacity: 0.4;
}

[data-scope='date-picker'][data-part='table-cell-trigger'][data-disabled] {
  opacity: 0.4;
}

[data-scope='date-picker'][data-part='table'] {
  min-width: 240px;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0.25rem;
}

[data-scope='date-picker'][data-part='trigger'] {
  cursor: pointer;
  border: 2px solid var(--gray-800);
  background: var(--white);
  padding: 0.5rem;
}

[data-scope='date-picker'][data-part='trigger'][data-state='open'] {
  box-shadow: var(--shadow-tiny);
}

[data-scope='date-picker'][data-part='view-control'] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
}

[data-scope='date-picker'][data-part='view-trigger'] {
  border: 0;
  background: none;
  cursor: pointer;
  padding: 4px 20px;
  text-transform: capitalize;
  border-radius: var(--rounded-sm);

  &:hover {
    background: var(--yellow-300);
  }
}
</style>
