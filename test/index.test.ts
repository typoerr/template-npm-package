import test from 'ava'
import { add } from '@/index'

test('initial test', (t) => {
  t.is(add(1, 1), 2)
})
