import { StyleSheet, Text, View, ScrollView, TextInput, Pressable } from 'react-native'
import tw from 'twrnc'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import { HandleResponse, TextField, Icons, SubmitModalBtn } from '@/components'
import { useCreateReviewMutation } from '@/services'
import { yupResolver } from '@hookform/resolvers/yup'
import { reviewSchema, ratingStatus } from '@/utils'
import { useForm, useFieldArray } from 'react-hook-form'
import { useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import Slider from '@react-native-community/slider'
 
const comment = () => {

  const { productID, productTitle } = useLocalSearchParams()

  const [rating, setRating] = useState(5)
  const [positiveValue, setPositiveValue] = useState('')
  const [negativeValue, setNegativeValue] = useState('')

  const [createReview, { isSuccess, isLoading, data, isError, error }] = useCreateReviewMutation()

  const { handleSubmit, register, formState: { errors: formErrors }, reset, control } = useForm({
    resolver: yupResolver(reviewSchema),
    defaultValues: {
      comment: '', title: '', positivePoints: [], negativePoints: [], rating: 1, product: '',
    },
  })

  const { fields: positivePointsFields, append: appentPositivePoint, remove: removePositivePoint } = useFieldArray({
    name: 'positivePoints',
    control,
  })

  const handleAddPositivePoint = () => {
    if (positiveValue) {
      appentPositivePoint({ id: nanoid(), title: positiveValue })
      setPositiveValue('')
    }
  }

  const { fields: negativePointsFields, append: appendNegativePoint, remove: removeNegativePoint } = useFieldArray({
    name: 'negativePoints',
    control,
  })

  const handleAddNegativePoint = () => {
    if (negativeValue) {
      appendNegativePoint({ id: nanoid(), title: negativeValue })
      setNegativeValue('')
    }
  }

  const submitHander = data =>
    createReview({
      body: { ...data, rating, product: productID },
    })

  return (
    <>
      <Stack.Screen options={{ title: `填写评价，${productTitle}`, headerBackTitleVisible: false }} />
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error?.data?.message}
          message={data?.message}
          onSuccess={() => {
            reset()
            setRating(1)
            router.back()
          }}
          onError={() => { }}
        />
      )}
      <ScrollView style={tw`bg-white`}>
        <View style={tw`bg-white`}>
          <View style={tw`flex flex-col justify-between flex-1 p-4 gap-y-5`}>
            {/* rating */}
            <View>
              <View style={tw`my-2 flex flex-row justify-center text-center`}>
                <Text style={tw`text-sm text-black`}>评分!:‌</Text>
                <Text style={tw`px-1 text-sm text-sky-500`}>{ratingStatus[rating]}</Text>
              </View>
              <Slider
                step={1}
                maximumValue={5}
                minimumValue={1}
                style={{ width: '100%' }}
                value={rating}
                onValueChange={value => {
                  setRating(value)
                }}
                disabled={false}
                maximumTrackTintColor="#CCCCCC"
              />
              <View style={tw`flex flex-row justify-between`}>
                {Array(5)
                  .fill('_')
                  .map((_, i) => (
                    <View key={i} style={tw`h-1 w-1 rounded-full bg-gray-300 inline-block`} />
                  ))}
              </View>
            </View>

            {/* title */}
            <View>
              <TextField
                label="评价标题"
                control={control}
                errors={formErrors.title}
                name="title"
              />
            </View>

            {/* positivePoints */}
            <View style={tw`space-y-3`}>
              <View style={tw`space-y-3`}>
                <Text style={tw`text-xs text-gray-700`}>优点</Text>
                <View style={tw`flex flex-row items-center input w-full px-3 py-2.5 transition-colors border border-gray-200 rounded-md outline-none bg-zinc-50/30 focus:border-blue-600 leading-none`}>
                  <TextInput
                    style={tw`flex-auto`}
                    type="text"
                    name="positivePoints"
                    id="positivePoints"
                    value={positiveValue}
                    onChangeText={value => {
                      setPositiveValue(value)
                    }}
                  />
                  <Pressable onPress={handleAddPositivePoint}>
                    <Icons.AntDesign size={16} name="plus" style={tw`icon`} />
                  </Pressable>
                </View>
              </View>
              {positivePointsFields.length > 0 && (
                <View style={tw`space-y-3`}>
                  {positivePointsFields.map((field, index) => (
                    <View key={field.id} style={tw`flex flex-row items-center px-3 gap-x-4`}>
                      <Icons.AntDesign size={16} name="plus" style={tw`text-green-500 icon`} />
                      <Text style={tw`flex-auto`}>{field.title}</Text>
                      <Pressable>
                        <Icons.AntDesign
                          size={16}
                          name="delete"
                          style={tw`icon text-gray`}
                          onPress={() => removePositivePoint(index)}
                        />
                      </Pressable>
                    </View>
                  ))}
                </View>
              )}
            </View>

            {/* negativePoints */}
            <View style={tw`space-y-3`}>
              <View style={tw`space-y-3`}>
                <Text style={tw`text-xs text-gray-700`}>缺点</Text>
                <View style={tw`flex flex-row items-center input w-full px-3 py-2.5 transition-colors border border-gray-200 rounded-md outline-none bg-zinc-50/30 focus:border-blue-600 leading-none`}>
                  <TextInput
                    style={tw`flex-auto`}
                    type="text"
                    name="negativePoints"
                    id="negativePoints"
                    value={negativeValue}
                    onChangeText={value => {
                      setNegativeValue(value)
                    }}
                  />
                  <Pressable onPress={handleAddNegativePoint}>
                    <Icons.AntDesign size={16} name="plus" style={tw`icon`} />
                  </Pressable>
                </View>
              </View>
              {negativePointsFields.length > 0 && (
                <View style={tw`space-y-3`}>
                  {negativePointsFields.map((field, index) => (
                    <View key={field.id} style={tw`flex flex-row items-center px-3 gap-x-4`}>
                      <Icons.AntDesign size={16} name="minus" style={tw`text-red-500 icon`} />
                      <Text style={tw`flex-auto`}>{field.title}</Text>
                      <Pressable>
                        <Icons.AntDesign
                          size={16}
                          name="delete"
                          style={tw`icon text-gray`}
                          onPress={() => removeNegativePoint(index)}
                        />
                      </Pressable>
                    </View>
                  ))}
                </View>
              )}
            </View>

            {/* comment */}
            <View>
              <TextField
                label="评价文字"
                control={control}
                errors={formErrors.comment}
                name="comment"
              />
            </View>
            <View style={tw`py-3`}>
              <SubmitModalBtn onPress={handleSubmit(submitHander)} isLoading={isLoading}>
                提交评价
              </SubmitModalBtn>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

export default comment

const styles = StyleSheet.create({})