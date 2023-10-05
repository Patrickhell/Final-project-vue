<template>
    <!-- Doctor Card -->
        <article class="w-full cursor-pointer">
	    	<div class="flex flex-col">
	    		<div class="bg-gray-50 shadow-md rounded-xl p-8 sm:p-4 relative overflow-hidden">
	    			<div class="flex-none sm:flex">

						<!-- Card Profile Picture -->
						<section class="flex items-center justify-between">
	    					<div class="relative h-32 w-32 sm:mb-0 mb-3 shadow-xl rounded-3xl overflow-hidden">

                                <!-- Image Skeleton Animation -->
                                <div role="status" class="animate-pulse flex items-center h-full w-full">
                                    <div class="flex items-center justify-center w-full h-full bg-gray-300 rounded sm:w-full">
                                        <svg class="w-28 h-28 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                        </svg>
                                    </div>
                                </div> 
                        
	    					</div>

							<div class="sm:hidden">
								<div class="flex items-center justify-between sm:mt-2">
									<div class="flex items-center">
										<div class="flex flex-col items-end">
											<div class="text-lg text-gray-800 font-bold">
								                <div role="status" class="animate-pulse">
                                                    <div class="h-4 bg-gray-200 rounded-full w-28"></div>
                                                </div>
								            </div>
											<div class="flex-auto text-gray-500 my-1">
												<span class="mr-3 border-r border-gray-200 max-h-0"></span>
                                                <span class="mt-2">
                                                    <div role="status" class="animate-pulse">
                                                        <div class="h-2.5 bg-gray-200 rounded-full w-32"></div>
                                                    </div>
                                                </span>
											</div>
										</div>
									</div>
								</div>
								<div class="flex flex-row justify-end mt-2">
									<div class="flex">
									    <template v-for="star in 5">
											<SkeletonStar class="text-gray-200"/>
									    </template>
									</div>
								</div>
							</div>
						</section>

						<!-- Card Content -->
	    				<div class="flex-auto sm:ml-5 justify-evenly">
	    					<div class="hidden sm:flex sm:items-center sm:justify-between sm:mt-2">
	    						<div class="flex items-center">
	    							<div class="flex flex-col">
	    								<div class="w-full flex-none text-lg text-gray-800 font-bold leading-none">
                                            <div role="status" class="animate-pulse">
                                                <div class="h-4 bg-gray-200 rounded-full w-32"></div>
                                            </div>
                                        </div>
	    								<div class="flex-auto text-gray-500 my-1">
	    									<span class="mr-3 border-r border-gray-200 max-h-0"></span>
                                            <span class="mt-2">
                                                <div role="status" class="animate-pulse">
                                                    <div class="h-2.5 bg-gray-200 rounded-full w-52"></div>
                                                </div>
                                            </span>
	    								</div>
	    							</div>
	    						</div>
	    				    </div>
	    				    <div class="hidden sm:flex sm:flex-row sm:items-center mt-2">
								<div role="status" class="animate-pulse flex">
								    <template v-for="star in 5">
										<SkeletonStar class="text-gray-200"/>
								    </template>
								</div>
	    					</div>

							<!-- Card footer -->
	    					<div class="flex pt-2 text-sm text-gray-500">
	    						<div class="flex-1 inline-flex items-center">
                                    <div role="status" class="animate-pulse">
                                        <div class="w-10 h-10 sm:w-5 sm:h-5 bg-gray-200 rounded-full"></div>
                                    </div>
	    							<p class="ml-3">
                                        <div role="status" class="animate-pulse space-y-2">
                                            <div class="hidden sm:block h-2.5 bg-gray-200 rounded-full w-64"></div>
                                            <div class="block sm:hidden h-2.5 bg-gray-200 rounded-full w-24"></div>
                                            <div class="block sm:hidden h-2.5 bg-gray-200 rounded-full w-44"></div>
                                        </div>
                                    </p>
	    						</div>
                                <div role="status" class="animate-pulse">
	    						    <div class="h-9 w-28 flex-no-shrink bg-gray-200 hover:bg-gray-200 px-5 ml-4 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-gray-300 hover:border-gray-300 text-white rounded-full transition ease-in duration-300"></div>
                                </div>
	    					</div>
	    				</div>
	    			</div>
                    <span class="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
	    		</div>
	    	</div>
        </article>
</template>

<script setup>
    import SkeletonStar from '../../svg/SkeletonStar.vue'
    const components = { SkeletonStar };
</script>

<style lang="scss" scoped>
</style>