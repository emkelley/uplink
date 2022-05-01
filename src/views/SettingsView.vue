<script setup lang="ts">
import TheNavbar from "@/components/TheNavbar.vue";
import ContentBox from "@/components/ContentBox.vue";
import { NavLink, Message } from "@/types";
import { ref, onBeforeUnmount } from "vue";
import { db, saveMessage } from "@/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
const navLinks: NavLink[] = [
  { name: "Feed", url: "/feed" },
  { name: "Settings", url: "/settings" },
];
let feed = ref<Message[]>();
let message = ref("");

const sendMessage = async () => {
  const { success } = await saveMessage(message.value);
  if (success) message.value = "";
};

const isValidUrl = (url: string) => {
  try {
    new URL(url);
  } catch (e) {
    return false;
  }
  return true;
};

const isValidImageUrl = (url: string) => {
  if (!isValidUrl(url)) {
    return false;
  }
  const ext = url.split(".").pop();
  if (ext === "png" || ext === "jpg" || ext === "jpeg" || ext === "gif") {
    return true;
  }
  return false;
};

const q = query(collection(db, "messages"));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const messages: Message[] = [];
  querySnapshot.forEach((doc) => {
    messages.push(doc.data() as Message);
  });
  feed.value = messages;
});

onBeforeUnmount(() => {
  unsubscribe();
});
</script>

<template>
  <TheNavbar logo="Uplink" :links="navLinks" />
  <div class="container container-sm mx-auto py-12">
    <h1 class="text-3xl font-bold uppercase text-emerald-800">The Feed</h1>

    <ContentBox>
      <div class="w-full flex flex-row">
        <div class="flex-grow pr-2">
          <input
            v-model="message"
            class="w-full h-full rounded px-3 py-4"
            type="text"
            name=""
            id=""
            autofocus
            @keyup.enter="sendMessage"
          />
        </div>
      </div>
      <div v-if="feed" id="results-wrapper" class="mt-6">
        <article v-for="(item, index) in feed" :key="index">
          <p class="text-xs mb-2">{{ item.timestamp }}</p>
          <div v-if="isValidImageUrl(item.content)">
            <img :src="item.content" class="rounded max-h-[500px] w-auto" />
          </div>

          <a
            v-else-if="isValidUrl(item.content)"
            :href="item.content"
            target="_blank"
            rel="noopener"
          >
            {{ item.content }}<i class="fa-solid fa-link ml-2" />
          </a>
          <p v-else>{{ item.content }}</p>
        </article>
      </div>
    </ContentBox>
  </div>
</template>

<style scoped>
article {
  @apply border border-slate-300 bg-slate-50 mb-4 rounded-b-lg rounded-r-lg p-3 w-max;
}
input {
  @apply bg-slate-200;
}
</style>
