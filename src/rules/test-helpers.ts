export function createDivCode(className: string) {
  return `
function Component() {
  return <div className="${className}" />
}
  `
}

export function createVariableDivCode(className: string) {
  return `
function Component() {
  const classes = "${className}"
  return <div className={classes} />
}
  `
}

export function createConditionDivCode(className: string) {
  return `
function Component() {
  const bool = Math.random() > 0.5
  const classes = "${className}"
  return <div className={bool ? classes : null} />
}
  `
}

export function createCnDivCode(className: string) {
  return `
import { cn } from 'classnames'
function Component() {
  return (
    <div
      className={cn({
        ["${className}"]: true,
      })}
    />
  )
}
  `
}

export function createDoubleCnDivCode(className: string) {
  return `
import { cn } from 'classnames'
function Component() {
  return (
    <div
      className={cn({
        ["${className}"]: true,
        ["flex items-center"]: false,
      })}
    />
  )
}
  `
}

export function createCnNoBracketsDivCode(className: string) {
  return `
import { cn } from 'classnames'
function Component() {
  return (
    <div
      className={cn({
        "${className}": true,
      })}
    />
  )
}
  `
}

export function createDoubleCnNoBracketsDivCode(className: string) {
  return `
import { cn } from 'classnames'
function Component() {
  return (
    <div
      className={cn({
        "${className}": true,
        "flex items-center": false,
      })}
    />
  )
}
  `
}

export function createCnDirectInvocationDivCode(className: string) {
  return `
import { cn } from 'classnames'
function Component() {
  return (
    <div
      className={cn("${className}", "flex items-center")}
    />
  )
}
  `
}

export function createCnDirectSecondInvocationDivCode(className: string) {
  return `
import { cn } from 'classnames'
function Component() {
  return (
    <div
      className={cn("flex items-center", "${className}")}
    />
  )
}
  `
}

export function createStringInterpolationDivCode(className: string) {
  return `
function Component() {
  const classes = "${className}"
  return <div className={\`\${classes}\`} />
}
  `
}

export function createMixedAfterStringInterpolationDivCode(className: string) {
  return `
function Component() {
  const classes = "${className}"
  return <div className={\`\${classes} flex items-center\`} />
}
  `
}

export function createMixedBeforeStringInterpolationDivCode(className: string) {
  return `
function Component() {
  const classes = "${className}"
  return <div className={\`flex items-center \${classes}\`} />
}
  `
}

export function createComponentCode(className: string) {
  return `
function Component1({ className }) {
  return <div className={className} />
}
function Component2() {
  return <Component1 className="${className}" />
}
`
}

export const createCodes = Object.entries({
  createDivCode,
  createVariableDivCode,
  createConditionDivCode,
  createCnDivCode,
  createDoubleCnDivCode,
  createCnNoBracketsDivCode,
  createDoubleCnNoBracketsDivCode,
  createCnDirectInvocationDivCode,
  createCnDirectSecondInvocationDivCode,
  createStringInterpolationDivCode,
  createMixedAfterStringInterpolationDivCode,
  createMixedBeforeStringInterpolationDivCode,
  createComponentCode,
})
