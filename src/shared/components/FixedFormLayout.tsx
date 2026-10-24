import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DarkTheme } from '../DarkTheme';

export function FixedFormLayout({ children, footer }: { children: ReactNode; footer: ReactNode }) {
  const insets = useSafeAreaInsets();
  const footerRef = useRef<View>(null);
  const keyboardVisible = useRef(false);
  const keyboardTop = useRef(Infinity);
  const active = useRef(true);
  const offsetRef = useRef(0);
  const [offset, setOffset] = useState(0);

  const revealInput = useCallback(() => {
    if (!keyboardVisible.current) return;
    const input = TextInput.State.currentlyFocusedInput();
    if (!input) return;
    footerRef.current?.measureInWindow((_x, footerTop) => {
      const measuredOffset = offsetRef.current;
      input.measureInWindow((_inputX, inputTop, _width, inputHeight) => {
        if (
          !active.current ||
          !keyboardVisible.current ||
          TextInput.State.currentlyFocusedInput() !== input ||
          offsetRef.current !== measuredOffset
        )
          return;
        const next = Math.max(
          0,
          measuredOffset + inputTop + inputHeight + 12 - Math.min(footerTop, keyboardTop.current),
        );
        if (Math.abs(next - offsetRef.current) > 1) {
          offsetRef.current = next;
          setOffset(next);
        }
      });
    });
  }, []);

  useEffect(() => {
    active.current = true;
    const show = Keyboard.addListener('keyboardDidShow', (event) => {
      keyboardVisible.current = true;
      keyboardTop.current = event.endCoordinates.screenY;
      requestAnimationFrame(revealInput);
    });
    const hide = Keyboard.addListener('keyboardDidHide', () => {
      keyboardVisible.current = false;
      keyboardTop.current = Infinity;
      offsetRef.current = 0;
      setOffset(0);
    });
    return () => {
      active.current = false;
      show.remove();
      hide.remove();
    };
  }, [revealInput]);

  return (
    <KeyboardAvoidingView
      style={[styles.screen, { paddingTop: insets.top + 12 }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      onTouchEnd={() => requestAnimationFrame(revealInput)}
    >
      <View style={styles.viewport} onLayout={() => requestAnimationFrame(revealInput)}>
        <View style={{ transform: [{ translateY: -offset }] }}>{children}</View>
      </View>
      <View
        ref={footerRef}
        collapsable={false}
        style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 12) }]}
        onLayout={() => requestAnimationFrame(revealInput)}
      >
        {footer}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: DarkTheme.colors.background, paddingHorizontal: 24 },
  viewport: { flex: 1, minHeight: 0, overflow: 'hidden' },
  footer: { flexShrink: 0, paddingTop: 12, backgroundColor: DarkTheme.colors.background },
});
