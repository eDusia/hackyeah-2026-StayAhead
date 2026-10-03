import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { curatedDailyOffers, inDemandRoles, senioritySalaries } from '@/mock/jobsData';
import { useUserStore } from '@/store/useUserStore';
import type { ContractType, CuratedJobOffer, MainTabParamList } from '@/types';

export function JobsScreen() {
  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();
  const profile = useUserStore((state) => state.profile);
  const [contractType, setContractType] = useState<ContractType>('b2b');
  const [selectedOffer, setSelectedOffer] = useState<CuratedJobOffer | null>(null);
  const [savedOffers, setSavedOffers] = useState<string[]>([]);

  const toggleSaveOffer = (id: string) => {
    setSavedOffers((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView contentContainerClassName="px-5 pb-10" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="mt-2">
          <Text className="text-sm font-semibold uppercase tracking-wider text-primary-600">
            Rynek & Rekrutacja
          </Text>
          <Text className="mt-1 text-3xl font-bold text-slate-900">Oferty pracy</Text>
          <Text className="mt-1 text-base text-slate-500">
            Analiza zapotrzebowania rynku, aktualne widełki i oferty dobrane pod Twój profil.
          </Text>
        </View>

        {/* User Context Banner */}
        <Card className="mt-4 border-primary-100 bg-primary-50/50 p-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 pr-2">
              <Text className="text-xs font-semibold text-primary-700 uppercase">
                Twój profil docelowy
              </Text>
              <Text className="mt-0.5 text-base font-bold text-slate-900">
                {profile.goal?.targetRole ?? 'AI Application Engineer'}
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-xs font-medium text-slate-500">Dopasowanie do rynku</Text>
              <Text className="text-lg font-bold text-primary-700">78% Match</Text>
            </View>
          </View>
        </Card>

        {/* 1. SEKCJA: KOGO NAJCZĘŚCIEJ SZUKAJĄ */}
        <View className="mt-7">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-lg font-bold text-slate-900">Kogo najczęściej szukają?</Text>
              <Text className="text-xs text-slate-500">
                Najszybciej rosnące zapotrzebowanie w branży Tech (dane 2026)
              </Text>
            </View>
            <Ionicons name="trending-up" size={20} color="#4f46e5" />
          </View>

          <View className="mt-3 gap-3">
            {inDemandRoles.map((role) => (
              <Card key={role.id} className="p-4">
                <View className="flex-row items-start justify-between">
                  <View className="flex-1 pr-2">
                    <View className="flex-row items-center gap-2">
                      <Text className="text-base font-bold text-slate-900">{role.title}</Text>
                    </View>
                    <Text className="mt-1 text-xs text-slate-500">{role.description}</Text>
                  </View>
                  <View className="items-end">
                    <View className="flex-row items-center rounded-lg bg-emerald-50 px-2 py-1">
                      <Ionicons name="arrow-up" size={12} color="#059669" />
                      <Text className="ml-0.5 text-xs font-bold text-emerald-700">
                        +{role.growthPercent}% r/r
                      </Text>
                    </View>
                    <Text className="mt-1 text-[11px] font-medium text-slate-400">
                      {role.openPositionsCount} aktywnych ofert
                    </Text>
                  </View>
                </View>

                {/* Progress Meter */}
                <View className="mt-3">
                  <View className="flex-row items-center justify-between text-xs">
                    <Text className="text-[11px] font-medium text-slate-500">Wskaźnik popytu</Text>
                    <Text className="text-[11px] font-bold text-primary-700">
                      {role.demandIndex}/100
                    </Text>
                  </View>
                  <View className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <View
                      className="h-full rounded-full bg-primary-600"
                      style={{ width: `${role.demandIndex}%` }}
                    />
                  </View>
                </View>

                {/* Key Skills */}
                <View className="mt-3 flex-row flex-wrap gap-1.5">
                  {role.topSkills.map((skill) => (
                    <View key={skill} className="rounded-md bg-slate-100 px-2 py-0.5">
                      <Text className="text-[11px] font-medium text-slate-600">{skill}</Text>
                    </View>
                  ))}
                </View>
              </Card>
            ))}
          </View>
        </View>

        {/* 2. SEKCJA: ANALIZA WIDEŁEK CENOWYCH */}
        <View className="mt-8">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-lg font-bold text-slate-900">Analiza widełek cenowych</Text>
              <Text className="text-xs text-slate-500">
                Stawki rynkowe według poziomu doświadczenia
              </Text>
            </View>
            {/* Toggle B2B / UoP */}
            <View className="flex-row rounded-xl bg-slate-200 p-0.5">
              <Pressable
                onPress={() => setContractType('b2b')}
                className={`rounded-lg px-2.5 py-1 ${
                  contractType === 'b2b' ? 'bg-white shadow-xs' : ''
                }`}
              >
                <Text
                  className={`text-xs font-bold ${
                    contractType === 'b2b' ? 'text-primary-700' : 'text-slate-600'
                  }`}
                >
                  B2B
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setContractType('uop')}
                className={`rounded-lg px-2.5 py-1 ${
                  contractType === 'uop' ? 'bg-white shadow-xs' : ''
                }`}
              >
                <Text
                  className={`text-xs font-bold ${
                    contractType === 'uop' ? 'text-primary-700' : 'text-slate-600'
                  }`}
                >
                  UoP
                </Text>
              </Pressable>
            </View>
          </View>

          <Card className="mt-3 p-4">
            <Text className="text-xs font-medium text-slate-500">
              {contractType === 'b2b'
                ? 'Wynagrodzenie miesięczne netto (+ VAT) na fakturę'
                : 'Miesięczne wynagrodzenie brutto na umowie o pracę'}
            </Text>

            <View className="mt-4 gap-4">
              {senioritySalaries.map((item) => {
                const rangeText = contractType === 'b2b' ? item.b2bRange : item.uopRange;
                const barWidth = Math.min(100, Math.round((item.maxK / 44) * 100));

                return (
                  <View key={item.level}>
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center gap-2">
                        <Text className="text-sm font-bold text-slate-900">{item.label}</Text>
                        <Text className="text-[11px] font-medium text-emerald-600">
                          {item.demandGrowth}
                        </Text>
                      </View>
                      <Text className="text-sm font-bold text-primary-700">{rangeText}</Text>
                    </View>
                    {/* Visual Salary Bar */}
                    <View className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                      <View
                        className="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-600"
                        style={{
                          width: `${barWidth}%`,
                          backgroundColor: '#4f46e5',
                        }}
                      />
                    </View>
                  </View>
                );
              })}
            </View>

            {/* Salary Key Takeaway */}
            <View className="mt-5 rounded-xl border border-slate-100 bg-slate-50 p-3">
              <View className="flex-row items-center gap-1.5">
                <Ionicons name="sparkles" size={15} color="#4f46e5" />
                <Text className="text-xs font-bold text-slate-900">
                  Wskazówka negocjacyjna od mentora:
                </Text>
              </View>
              <Text className="mt-1 text-xs leading-5 text-slate-600">
                Połączenie wiedzy programistycznej z ewaluacją agentów AI (moduł z Twojego 3. etapu)
                pozwala aplikować od razu na górne widełki poziomu Mid (22–24k B2B) lub role Senior
                w startupach produktowych.
              </Text>
            </View>
          </Card>
        </View>

        {/* 3. SEKCJA: 2-3 NAJCIEKAWSZE OFERTY Z DNIA */}
        <View className="mt-8">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-lg font-bold text-slate-900">Najciekawsze oferty z dziś</Text>
              <Text className="text-xs text-slate-500">
                Starannie wyselekcjonowane pod Twoje cele rozwojowe
              </Text>
            </View>
            <View className="rounded-full bg-primary-100 px-2 py-0.5">
              <Text className="text-[11px] font-bold text-primary-700">Top 3 Dnia</Text>
            </View>
          </View>

          <View className="mt-3 gap-3">
            {curatedDailyOffers.map((offer) => {
              const isSaved = savedOffers.includes(offer.id);
              return (
                <Pressable
                  key={offer.id}
                  onPress={() => setSelectedOffer(offer)}
                  className="active:opacity-90"
                >
                  <Card className="p-4 shadow-sm">
                    {/* Header: Company & Badges */}
                    <View className="flex-row items-start justify-between">
                      <View className="flex-1 pr-2">
                        <View className="flex-row items-center gap-2">
                          <Text className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                            {offer.company}
                          </Text>
                          {offer.isHotToday ? (
                            <View className="rounded-md bg-amber-100 px-1.5 py-0.5">
                              <Text className="text-[10px] font-bold text-amber-800">HOT</Text>
                            </View>
                          ) : null}
                        </View>
                        <Text className="mt-1 text-base font-bold text-slate-900">
                          {offer.title}
                        </Text>
                        <View className="mt-1 flex-row items-center gap-1">
                          <Ionicons name="location-outline" size={13} color="#94a3b8" />
                          <Text className="text-xs text-slate-500">{offer.location}</Text>
                        </View>
                      </View>

                      <View className="items-end gap-1.5">
                        <View className="rounded-xl bg-primary-50 px-2.5 py-1">
                          <Text className="text-xs font-bold text-primary-700">
                            {offer.matchScore}% Match
                          </Text>
                        </View>
                        <Pressable
                          onPress={(e) => {
                            e.stopPropagation?.();
                            toggleSaveOffer(offer.id);
                          }}
                          hitSlop={10}
                        >
                          <Ionicons
                            name={isSaved ? 'bookmark' : 'bookmark-outline'}
                            size={18}
                            color={isSaved ? '#4f46e5' : '#94a3b8'}
                          />
                        </Pressable>
                      </View>
                    </View>

                    {/* Salary */}
                    <View className="mt-3 flex-row items-center justify-between border-y border-slate-100 py-2">
                      <Text className="text-xs font-medium text-slate-500">Stawka:</Text>
                      <Text className="text-sm font-bold text-emerald-700">
                        {contractType === 'b2b' ? offer.salaryB2B : offer.salaryUoP}
                      </Text>
                    </View>

                    {/* Skills pills: Matching vs Missing */}
                    <View className="mt-3">
                      <Text className="text-[11px] font-medium text-slate-400">Kompetencje:</Text>
                      <View className="mt-1 flex-row flex-wrap gap-1.5">
                        {offer.matchingSkills.map((skill) => (
                          <View
                            key={skill}
                            className="flex-row items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5"
                          >
                            <Ionicons name="checkmark" size={11} color="#059669" />
                            <Text className="text-[11px] font-semibold text-emerald-800">
                              {skill}
                            </Text>
                          </View>
                        ))}
                        {offer.missingSkills.map((skill) => (
                          <View
                            key={skill}
                            className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5"
                          >
                            <Text className="text-[11px] text-slate-500">+{skill}</Text>
                          </View>
                        ))}
                      </View>
                    </View>

                    {/* Why good match */}
                    <View className="mt-3 rounded-xl bg-primary-50/60 p-2.5">
                      <Text className="text-xs leading-4 text-primary-800">
                        💡 <Text className="font-semibold">Dlaczego warto:</Text>{' '}
                        {offer.whyGoodMatch}
                      </Text>
                    </View>

                    {/* Footer button */}
                    <View className="mt-3 flex-row items-center justify-end gap-1">
                      <Text className="text-xs font-bold text-primary-600">
                        Zobacz szczegóły oferty
                      </Text>
                      <Ionicons name="chevron-forward" size={14} color="#4f46e5" />
                    </View>
                  </Card>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Offer Detail Modal */}
      <Modal
        visible={selectedOffer !== null}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setSelectedOffer(null)}
      >
        <SafeAreaView className="flex-1 bg-white">
          <View className="flex-row items-center justify-between border-b border-slate-100 px-5 py-3">
            <View className="flex-row items-center gap-2">
              <Badge label={`${selectedOffer?.matchScore}% Dopasowania`} variant="info" />
              <Text className="text-xs text-slate-400">{selectedOffer?.company}</Text>
            </View>
            <Pressable
              onPress={() => setSelectedOffer(null)}
              className="h-8 w-8 items-center justify-center rounded-full bg-slate-100"
            >
              <Ionicons name="close" size={20} color="#64748b" />
            </Pressable>
          </View>

          {selectedOffer ? (
            <ScrollView contentContainerClassName="px-5 py-6 pb-12" showsVerticalScrollIndicator={false}>
              <Text className="text-2xl font-bold leading-8 text-slate-900">
                {selectedOffer.title}
              </Text>
              <Text className="mt-1 text-sm font-semibold text-primary-700">
                {selectedOffer.company} · {selectedOffer.location}
              </Text>

              {/* Salary Card */}
              <View className="mt-4 rounded-2xl bg-emerald-50/70 p-4 border border-emerald-100">
                <Text className="text-xs font-medium text-emerald-800">Widełki wynagrodzenia:</Text>
                <Text className="mt-1 text-xl font-bold text-emerald-900">
                  {selectedOffer.salaryB2B}
                </Text>
                {selectedOffer.salaryUoP ? (
                  <Text className="mt-0.5 text-xs text-emerald-700">
                    lub {selectedOffer.salaryUoP}
                  </Text>
                ) : null}
              </View>

              {/* Match Evaluation */}
              <View className="mt-5">
                <Text className="text-base font-bold text-slate-900">
                  Analiza zgodności z Twoją ścieżką
                </Text>
                <Text className="mt-1 text-sm leading-5 text-slate-600">
                  {selectedOffer.whyGoodMatch}
                </Text>

                <View className="mt-3">
                  <Text className="text-xs font-bold text-emerald-800">
                    Posiadane umiejętności:
                  </Text>
                  <View className="mt-1.5 flex-row flex-wrap gap-1.5">
                    {selectedOffer.matchingSkills.map((s) => (
                      <Badge key={s} label={`✓ ${s}`} variant="success" />
                    ))}
                  </View>
                </View>

                <View className="mt-3">
                  <Text className="text-xs font-bold text-amber-800">
                    Do zrealizowania w kolejnych etapach:
                  </Text>
                  <View className="mt-1.5 flex-row flex-wrap gap-1.5">
                    {selectedOffer.missingSkills.map((s) => (
                      <Badge key={s} label={`Do opanowania: ${s}`} variant="warning" />
                    ))}
                  </View>
                </View>
              </View>

              {/* Description */}
              <View className="mt-6">
                <Text className="text-base font-bold text-slate-900">O stanowisku</Text>
                <Text className="mt-1.5 text-sm leading-6 text-slate-700">
                  {selectedOffer.description}
                </Text>
              </View>

              {/* Responsibilities */}
              <View className="mt-6">
                <Text className="text-base font-bold text-slate-900">Zakres obowiązków</Text>
                <View className="mt-2 gap-2">
                  {selectedOffer.keyResponsibilities.map((resp, i) => (
                    <View key={i} className="flex-row items-start gap-2">
                      <Text className="text-xs text-primary-600 font-bold">•</Text>
                      <Text className="flex-1 text-sm leading-5 text-slate-700">{resp}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Perks */}
              <View className="mt-6">
                <Text className="text-base font-bold text-slate-900">Benefity i środowisko</Text>
                <View className="mt-2 flex-row flex-wrap gap-2">
                  {selectedOffer.perks.map((perk, i) => (
                    <View key={i} className="rounded-xl bg-slate-100 px-3 py-1.5">
                      <Text className="text-xs font-medium text-slate-700">{perk}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Action buttons */}
              <View className="mt-8 gap-3">
                <Button
                  label="Skonsultuj tę ofertę z Mentorem AI"
                  onPress={() => {
                    setSelectedOffer(null);
                    navigation.navigate('Messages');
                  }}
                />
                <Button
                  label="Zapisz ofertę do profilu"
                  variant="outline"
                  onPress={() => {
                    toggleSaveOffer(selectedOffer.id);
                    setSelectedOffer(null);
                  }}
                />
              </View>
            </ScrollView>
          ) : null}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
