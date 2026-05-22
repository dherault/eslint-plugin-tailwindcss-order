export const extractFromIdentifier = (
  node: any,
  context: any,
): { classString: string | null, valueNode: any, quoteChar: string } | null => {
  if (node.type !== 'Identifier') return null

  const variableName = node.name
  const { sourceCode } = context
  const scope = sourceCode.getScope(node)

  let variable = scope.set.get(variableName)
  if (!variable) {
    let currentScope = scope.upper
    while (currentScope && !variable) {
      variable = currentScope.set.get(variableName)
      currentScope = currentScope.upper
    }
  }

  if (variable && variable.defs && variable.defs.length > 0) {
    const def = variable.defs[0]
    if (
      def.node.type === 'VariableDeclarator'
      && def.node.init?.type === 'Literal'
      && typeof def.node.init.value === 'string'
    ) {
      const raw = sourceCode.getText(def.node.init)

      return {
        classString: def.node.init.value,
        valueNode: def.node.init,
        quoteChar: raw[0],
      }
    }
  }

  return null
}

export const extractClassString = (
  node: any,
  context: any,
): { classString: string | null, valueNode: any, quoteChar: string }[] => {
  const results: { classString: string | null, valueNode: any, quoteChar: string }[] = []

  if (node.value?.type === 'Literal' && typeof node.value.value === 'string') {
    results.push({
      classString: node.value.value,
      valueNode: node.value,
      quoteChar: '"',
    })
  }
  else if (
    node.value?.type === 'JSXExpressionContainer'
    && node.value.expression.type === 'Literal'
    && typeof node.value.expression.value === 'string'
  ) {
    results.push({
      classString: node.value.expression.value,
      valueNode: node.value.expression,
      quoteChar: "'",
    })
  }
  else if (
    node.value?.type === 'JSXExpressionContainer'
    && node.value.expression.type === 'Identifier'
  ) {
    const result = extractFromIdentifier(node.value.expression, context)
    if (result) results.push(result)
  }
  else if (
    node.value?.type === 'JSXExpressionContainer'
    && node.value.expression.type === 'TemplateLiteral'
  ) {
    const templateLiteral = node.value.expression
    const { quasis, expressions } = templateLiteral

    if (expressions.length === 0 && quasis.length === 1) {
      const classString = quasis[0].value.cooked ?? ''
      results.push({
        classString,
        valueNode: templateLiteral,
        quoteChar: '`',
      })
    }
    else if (expressions.length === 1) {
      const expression = expressions[0]
      if (expression.type === 'Identifier') {
        const result = extractFromIdentifier(expression, context)
        if (result) results.push(result)
      }
      else if (
        expression.type === 'Literal'
        && typeof expression.value === 'string'
        && quasis.length === 2
        && quasis.every((quasi: { value: { raw: string } }) => quasi.value.raw === '')
      ) {
        results.push({
          classString: expression.value,
          valueNode: templateLiteral,
          quoteChar: '`',
        })
      }
    }
  }
  else if (
    node.value?.type === 'JSXExpressionContainer'
    && node.value.expression.type === 'ConditionalExpression'
  ) {
    const { consequent } = node.value.expression
    if (consequent.type === 'Identifier') {
      const result = extractFromIdentifier(consequent, context)
      if (result) results.push(result)
    }
    else if (consequent.type === 'Literal' && typeof consequent.value === 'string') {
      const { sourceCode } = context
      const raw = sourceCode.getText(consequent)
      results.push({
        classString: consequent.value,
        valueNode: consequent,
        quoteChar: raw[0],
      })
    }
  }
  else if (
    node.value?.type === 'JSXExpressionContainer'
    && node.value.expression.type === 'CallExpression'
  ) {
    const callExpr = node.value.expression

    for (const arg of callExpr.arguments ?? []) {
      if (arg.type === 'Literal' && typeof arg.value === 'string') {
        const { sourceCode } = context
        const raw = sourceCode.getText(arg)
        results.push({
          classString: arg.value,
          valueNode: arg,
          quoteChar: raw[0],
        })
      }
    }

    const objectArg = callExpr.arguments?.find((arg: any) => arg.type === 'ObjectExpression')
    if (objectArg) {
      for (const property of objectArg.properties) {
        if (
          property.type === 'Property'
          && property.key.type === 'Literal'
          && typeof property.key.value === 'string'
        ) {
          const { sourceCode } = context
          const raw = sourceCode.getText(property.key)
          results.push({
            classString: property.key.value,
            valueNode: property.key,
            quoteChar: raw[0],
          })
        }
      }
    }
  }

  return results
}
