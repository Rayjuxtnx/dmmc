"use client"

import { motion, type HTMLMotionProps } from "framer-motion"
import React from "react"
import { cn } from "@/lib/utils"

type AnimateProps = {
  children: React.ReactNode
  className?: string
  as?: keyof typeof motion
  variant?: "fadeIn" | "fadeInUp" | "fadeInLeft" | "fadeInRight"
} & Omit<HTMLMotionProps<any>, "variant">

const variants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
}

export function Animate({
  children,
  className,
  as = "div",
  variant = "fadeInUp",
  ...props
}: AnimateProps) {
  const Component = motion[as]

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      variants={variants[variant]}
      className={cn(className)}
      {...props}
    >
      {children}
    </Component>
  )
}
