<template>
    <router-view></router-view>
</template>

<script setup lang="ts">
import { flexible } from '@/utils/flexible'
flexible(window, document)
</script>

<style>
p {
	margin: 0;
}
</style>