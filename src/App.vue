<template>
    <v-app>
        <router-view></router-view>
    </v-app>
</template>

<script>
export default {
    name: 'App',
    data: () => ({
        a: {
            b: 1
        }
    }),
    mounted() {},
    methods: {}
}
</script>
