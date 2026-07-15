"use client"

import * as React from "react"
import { Controller, FormProvider, useFormContext, useFormState } from "react-hook-form"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

const Form = FormProvider

type FormFieldContextValue = {
  name: string
}

const FormFieldContext = React.createContext<FormFieldContextValue>({
  name: ""
})

const FormField = Controller

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const formState = useFormState({ name: fieldContext.name })
  const form = useFormContext()

  const error = (formState.errors as Record<string, { message?: string }>)[fieldContext.name]

  return {
    ...form,
    ...formState,
    error,
    id: fieldContext.name,
    formItemId: `${fieldContext.name}-form-item`,
    formDescriptionId: `${fieldContext.name}-form-description`,
    formMessageId: `${fieldContext.name}-form-message`
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>({
  id: ""
})

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="form-item" className={cn("grid gap-2", className)} {...props} />
  )
}

function FormLabel({ className, ...props }: React.ComponentProps<"label">) {
  const { error, formItemId } = useFormField()

  return (
    <label
      data-slot="form-label"
      className={cn("text-sm font-medium leading-none", error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  )
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField()
  const body = error?.message

  if (!body) {
    return null
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
}

export { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, useFormField }
