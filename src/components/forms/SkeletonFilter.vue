<template>
    <div class="hidden lg:block lg:space-y-6">
        <div role="status" class="max-w-sm animate-pulse">
            <div class="h-8 bg-gray-200 rounded-lg dark:bg-gray-700 w-full"></div>
        </div>
        <h3 class="sr-only">Specialties</h3>
        <span class="font-medium text-gray-900">
            <div role="status" class="max-w-sm animate-pulse">
                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            </div>
        </span>
        <ul role="list" class="space-y-4 border-b border-black pb-6 text-sm font-medium text-gray-900">
          <li v-for="n in 15">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div role="status" class="max-w-sm animate-pulse">
                    <div class="h-4 bg-gray-200 rounded dark:bg-gray-700 w-4"></div>
                </div>
                <label class="ml-3 text-sm text-gray-600">
                    <div role="status" class="max-w-sm animate-pulse">
                        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
                    </div>
                </label>
              </div>
              <span>
                <div role="status" class="max-w-sm animate-pulse">
                    <div class="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-3"></div>
                </div>
              </span>
            </div>
          </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'SkeletonFilter'
}
</script>
<style lang="scss" scoped>
</style>