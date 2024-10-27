'use client'

import { motion } from 'framer-motion'
import { textContainer, textVariant } from '@/lib/motion'
import clsx from 'clsx'

interface TypingEffectProps {
  title: string
  textStyles?: string
}

const TypingEffect = ({ title, textStyles }: TypingEffectProps) => {
  return (
    <motion.p
      variants={textContainer}
      className={clsx(textStyles, 'font-bold text-3xl text-white')}
    >
      {Array.from(title).map((letter, index) => (
        <motion.span variants={textVariant} key={index}>
          {letter}
        </motion.span>
      ))}
    </motion.p>
  )
}

export default TypingEffect
