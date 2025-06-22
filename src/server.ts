#!/usr/bin/env node
import { createServer } from './index.js'

// 按需传入 config，这里默认空对象
createServer({ config: {} })