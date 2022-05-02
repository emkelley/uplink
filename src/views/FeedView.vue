<script setup lang="ts">
import TheNavbar from "@/components/TheNavbar.vue";
import ContentBox from "@/components/ContentBox.vue";
import { NavLink, Message } from "@/types";
import { ref, onBeforeUnmount } from "vue";
import { db, saveMessage } from "@/firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { isValidUrl, isValidImageUrl, formatTimestamp } from "@/utils";
import { useToast } from "vue-toastification";

let feed = ref<Message[]>();
let message = ref("");
const toast = useToast();
const navLinks: NavLink[] = [
  { name: "Feed", url: "/feed" },
  { name: "Settings", url: "/settings" },
];

const sendMessage = async () => {
  const { success } = await saveMessage(message.value);
  if (success) message.value = "";
};

const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const messages: Message[] = [];
  querySnapshot.forEach((doc) => {
    messages.push(doc.data() as Message);
  });
  feed.value = messages;

  toast("Feed refreshed with latest messages");
});

onBeforeUnmount(() => {
  unsubscribe();
});
</script>

<template>
  <TheNavbar logo="Uplink" :links="navLinks" />
  <div class="container container-sm mx-auto py-12 px-4">
    <h1 class="text-3xl font-bold uppercase text-emerald-800 mb-8">The Feed</h1>

    <div class="w-full flex flex-row">
      <div class="flex-grow">
        <input
          v-model="message"
          class="w-full h-full rounded-l-md px-3 py-4"
          type="text"
          placeholder="Send a message..."
          autofocus
          @keyup.enter="sendMessage"
        />
      </div>
      <button class="rounded-l-none rounded-r-md">Send Message</button>
    </div>
    <ContentBox>
      <div v-if="feed" id="results-wrapper" class="overflow-hidden">
        <article v-for="(item, index) in feed" :key="index">
          <p class="text-xs mb-2">
            {{ formatTimestamp(item.timestamp) }}
          </p>
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

<style lang="scss" scoped>
#results-wrapper {
  max-height: 500px;
  overflow-y: scroll;
  @apply bg-slate-50 p-4 border border-slate-300 rounded;
}
article {
  @apply border border-slate-300 bg-white mb-4 rounded-b-lg rounded-r-lg p-3 w-max;
}
input {
  @apply bg-white text-teal-900 border border-teal-700;
  &:focus {
    @apply rounded-r-none;
  }
  &::placeholder {
    @apply text-teal-900;
  }
}
</style>
