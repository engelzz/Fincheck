import { View } from "react-native";
import Swiper from "react-native-swiper";

import { MONTHS } from "../../../../../config/constants";
import { ChevronLeftIcon } from "../../../../components/Icons/ChevronLeftIcon";
import { ChevronRightIcon } from "../../../../components/Icons/ChevronRight";
import { Text } from "../../../../components/Text";
import { SwiperWrapper } from "./styles";

export function TransactionSwipper() {
  return (
    <View>
      <SwiperWrapper>
          <Swiper
            height={48}
            horizontal
            showsButtons
            loadMinimal
            showsPagination={false}
            nextButton={<ChevronRightIcon />}
            prevButton={<ChevronLeftIcon />}
        >
          {MONTHS.map((month) => (
            <View 
              style={{alignItems: 'center', justifyContent: 'center', paddingTop: 16}}
              key={month}
            >
              <Text style={{width: '100%', textAlign: 'center'}} size={14} weight="500" color="#343A40">{month}</Text>
            </View>
          ))}
        </Swiper>
      </SwiperWrapper>
    </View>
  )
}