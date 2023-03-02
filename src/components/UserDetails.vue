<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2>User Details</h2>
        <div>
          <form>
            <div class="form-group">
              <label for="search">Search by title:</label>
              <input
                type="text"
                v-model="search"
                class="form-control"
                id="search"
              />
            </div>
            <div class="form-group">
              <label for="completed">Filter by completion:</label>
              <select
                v-model="completedFilter"
                class="form-control"
                id="completed"
              >
                <option value="all">All</option>
                <option value="true">Completed</option>
                <option value="false">Not completed</option>
              </select>
            </div>
          </form>
          <div v-if="user">
            <p><strong>Name:</strong> {{ user.name }}</p>
            <p><strong>Username:</strong> {{ user.username }}</p>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <p><strong>Phone:</strong> {{ user.phone }}</p>
            <p><strong>Website:</strong> {{ user.website }}</p>
            <p><strong>Company:</strong> {{ user.company.name }}</p>
            <h3>Todo List</h3>
            <table class="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Completed</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="todo in filteredTodos" :key="todo.id">
                  <td>{{ todo.title }}</td>
                  <td>{{ todo.completed ? "Yes" : "No" }}</td>
                  <td>
                    <button @click="toggleFavorite(todo)">
                      {{
                        isFavorite(todo.id)
                          ? "Remove from"
                          : "Add to favorites"
                      }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else>
            <p>User not found</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
      todos: [],
      search: "",
      completedFilter: "all",
      favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    };
  },
  mounted() {
    const userId = this.$route.params.id;
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        this.user = data;
        this.getTodos(userId);
      })
      .catch((error) => console.error(error));
  },
  methods: {
    getTodos(userId) {
      fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
        .then((response) => response.json())
        .then((data) => {
          this.todos = data;
        })
        .catch((error) => console.error(error));
    },
    toggleFavorite(todo) {
      const index = this.favorites.indexOf(todo.id);
      if (index === -1) {
        this.favorites.push(todo.id);
      } else {
        this.favorites.splice(index, 1);
      }
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },
    isFavorite(id) {
      return this.favorites.includes(id);
    },
  },
  computed: {
    filteredTodos() {
      let filtered = this.todos;
      if (this.completedFilter !== "all") {
        filtered = filtered.filter(
          (todo) => todo.completed === (this.completedFilter === "true")
        );
      }
      if (this.search) {
        filtered = filtered.filter((todo) =>
          todo.title.toLowerCase().includes(this.search.toLowerCase())
        );
      }
      return filtered;
    },
  },
};
</script>
<style>
h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="text"],
select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  background-color: #1da1f2;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.alert {
  background-color: #f5f8fa;
  color: #1da1f2;
  padding: 10px;
  border-radius: 4px;
  margin-top: 20px;
}

th,
td {
  text-align: left;
}

th {
  font-weight: bold;
}

button:focus {
  outline: none;
}

button:hover {
  background-color: #0c8fde;
}
    
</style>