<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2>Login Form</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              v-model.trim="username"
              :class="{ 'is-invalid': !isUsernameValid }"
              class="form-control"
            />
            <div v-if="!isUsernameValid" class="invalid-feedback">
              Please enter a valid username
            </div>
          </div>
          <div class="form-group">
            <label for="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
              v-model.trim="phone"
              :class="{ 'is-invalid': !isPhoneValid }"
              class="form-control"
            />
            <div v-if="!isPhoneValid" class="invalid-feedback">
              Please enter a valid phone number
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
        <div v-if="isError" class="alert alert-danger mt-3">
          Invalid username or phone number, please try again
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      phone: "",
      isUsernameValid: true,
      isPhoneValid: true,
      users: [],
      isError: false,
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((data) => {
          this.users = data;
        })
        .catch((error) => console.error(error));
    },
    submitForm() {
      this.isUsernameValid = /^[a-zA-Z]+$/.test(this.username);
      if (this.isUsernameValid) {
        const user = this.users.find(
          (user) => user.username === this.username && user.phone === this.phone
        );
        if (user) {
          this.isError = false;
          this.$router.push(`/userDetails/${user.id}`);
        } else {
          this.isError = true;
        }
      }
    },
  },
};
</script>
