import { AntDesign } from '@react-native-vector-icons/ant-design';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { DarkTheme } from '../DarkTheme';
import { useRouter } from 'expo-router';

export type THeader = {
  titleName: string;
};

export function ArrowBack({ titleName }: THeader) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <Pressable onPress={() => router.back()}>
        <View style={styles.arrowback}>
          <AntDesign name="arrow-left" color={DarkTheme.colors.text} size={20} />
        </View>
      </Pressable>
      <View>
        <Text style={styles.title}>{titleName}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },

  title: {
    color: DarkTheme.colors.text,
    fontSize: DarkTheme.fontSizes.large,
  },

  arrowback: {
    gap: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
