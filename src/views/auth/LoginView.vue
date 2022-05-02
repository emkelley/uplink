<script setup lang="ts">
import { AuthError, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import { ref, reactive } from "vue";
import ContentBox from "@/components/ContentBox.vue";

const auth = getAuth();
const router = useRouter();

let creds = reactive({
  email: "",
  password: "",
});
let error = ref("");

const login = async () => {
  error.value = "";
  try {
    await signInWithEmailAndPassword(auth, creds.email, creds.password);
    router.push("/feed");
  } catch (e) {
    error.value = (e as AuthError).code;
  }
};
</script>

<template>
  <div class="container container-sm mx-auto h-screen py-12 px-4">
    <div class="flex h-full justify-center items-center">
      <div class="w-96">
        <h1
          class="text-3xl font-black tracking-wide uppercase text-teal-800 text-center"
        >
          UPLINK
        </h1>
        <ContentBox>
          <div class="flex flex-col">
            <input
              class="input"
              name="email"
              placeholder="email"
              type="email"
              v-model="creds.email"
            />
            <input
              class="input"
              name="password"
              placeholder="password"
              type="password"
              v-model="creds.password"
              @keydown.enter="login"
            />
            <button
              @click="login"
              type="submit"
              class="py-2 px-5 bg-teal-800 text-white rounded-md"
            >
              Login
            </button>
            <aside
              v-if="error"
              class="bg-red-100 border border-red-400 my-4 p-2"
            >
              <p class="text-red-800">
                <strong>Error: </strong>
                <span>{{ error }}</span>
              </p>
            </aside>
          </div>
          <form @submit.prevent="login"></form>
        </ContentBox>
      </div>
    </div>
  </div>
</template>
<style scoped>
.input {
  @apply py-2 px-4 mb-4 border border-teal-600 rounded;
}
</style>
