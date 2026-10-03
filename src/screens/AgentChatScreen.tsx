import { Feather, Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AgentStatusBadge } from '@/components/dashboard/AgentStatusBadge';
import { quickReplyOptions } from '@/mock/agentPrompts';
import { useChatStore } from '@/store/useChatStore';
import { useUserStore } from '@/store/useUserStore';

export function AgentChatScreen() {
  const profile = useUserStore((state) => state.profile);
  const { messages, agentStatus, sendMessage } = useChatStore();
  const [draft, setDraft] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const submit = (value = draft) => {
    if (!value.trim()) {
      return;
    }
    sendMessage(value);
    setDraft('');
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-950" edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View className="border-b border-slate-800/80 bg-slate-900/90 px-5 py-3.5">
          <View className="flex-row items-center justify-between">
            <View>
              <View className="flex-row items-center gap-2">
                <Text className="text-xl font-black tracking-tight text-slate-100">Mentor AI</Text>
                <View className="rounded-full bg-indigo-500/20 px-2 py-0.5">
                  <Text className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">
                    StayAhead
                  </Text>
                </View>
              </View>
              <Text className="mt-0.5 text-xs text-slate-400">
                Kontekst:{' '}
                <Text className="font-semibold text-indigo-400">
                  {profile.goal?.targetRole ?? 'brak celu'}
                </Text>
              </Text>
            </View>
            <AgentStatusBadge status={agentStatus} />
          </View>
        </View>

        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          contentContainerClassName="px-5 py-4"
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((message, index) => {
            const isUser = message.role === 'user';
            return (
              <Animated.View
                key={message.id}
                entering={FadeInDown.delay(index * 40).duration(300)}
                className={`mb-3.5 max-w-[86%] rounded-3xl px-4 py-3.5 ${
                  isUser
                    ? 'self-end rounded-br-sm border border-indigo-500/50 bg-indigo-600'
                    : 'self-start rounded-bl-sm border border-slate-800/90 bg-slate-900/90 shadow-sm shadow-black/40'
                }`}
              >
                {!isUser ? (
                  <View className="mb-1.5 flex-row items-center gap-1.5">
                    <Feather name="zap" size={12} color="#818cf8" />
                    <Text className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                      StayAhead AI
                    </Text>
                  </View>
                ) : null}
                <Text
                  className={`text-base leading-6 ${
                    isUser ? 'font-medium text-white' : 'text-slate-200'
                  }`}
                >
                  {message.content}
                </Text>
              </Animated.View>
            );
          })}
          {agentStatus !== 'idle' ? (
            <Animated.View entering={FadeInDown.duration(300)} className="mb-4 flex-row items-center gap-2">
              <View className="h-2 w-2 rounded-full bg-indigo-400" />
              <Text className="text-xs font-medium text-slate-400">
                Mentor AI generuje spersonalizowaną odpowiedź…
              </Text>
            </Animated.View>
          ) : null}
        </ScrollView>

        <View className="border-t border-slate-800/80 bg-slate-900/95 px-5 pb-24 pt-3">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="gap-2 pb-3"
          >
            {quickReplyOptions.map((option) => (
              <Pressable
                key={option.id}
                onPress={() => submit(option.prompt)}
                className="rounded-full border border-slate-700/80 bg-slate-800/80 px-3.5 py-1.5 active:bg-slate-700"
              >
                <Text className="text-xs font-semibold text-slate-300">{option.label}</Text>
              </Pressable>
            ))}
          </ScrollView>
          <View className="min-h-[52px] flex-row items-center rounded-2xl border border-slate-800 bg-slate-950 px-3.5">
            <TextInput
              value={draft}
              onChangeText={setDraft}
              placeholder="Napisz do mentora…"
              placeholderTextColor="#64748b"
              className="flex-1 py-3 text-base text-slate-100"
              onSubmitEditing={() => submit()}
              returnKeyType="send"
            />
            <Pressable
              onPress={() => submit()}
              className="h-9 w-9 items-center justify-center rounded-full bg-indigo-600 active:scale-95"
            >
              <Ionicons name="send" size={15} color="#ffffff" />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
