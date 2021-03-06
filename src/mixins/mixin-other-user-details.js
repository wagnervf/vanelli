export default {
  computed: {
    mixinOtherUserDetails () {
      if (this.$store.state.store.users[this.$route.params.otherUserId]) {
        return this.$store.state.store.users[this.$route.params.otherUserId]
      }
      return {}
    }
  }
}