import React from 'react'
import Color from 'color'

import composeStyles from 'clear-ui-base/lib/utils/stylesMixin/composeStyles'
import COLORS from '../styles/colors'
import Button from '../button'

import {getOuterOutlineStyle, getWhitelineStyle} from './outlineStyles'

function getStyles(props, state) {
	let root = {
		//background: transparent
	}
	let label = {}
	let rightIcon = {}
	let leftIcon = {}
	let innerOutline = {}
	let outerOutline = {}

	let stateMod = state.state || 'initial'

	function getBorderOutlineStyle(color) {
		return {
			position: 'absolute',
			zIndex: 2,
			borderRadius: 2,
			top: 0,
			left: 0,
			bottom: 0,
			right: 0,
			boxShadow: `0 0 0 2px ${color} inset`
		}
	}

	if (props.disabled) {
		Object.assign(root, {
			color: COLORS.black3,
			fill: COLORS.black3
		})
		innerOutline = getBorderOutlineStyle(COLORS.black4)
	} else {
		let colorMod = props.color || 'grey'
		if (colorMod === 'grey') {
			if (stateMod === 'initial') {
				root.color = COLORS.black2
				root.fill = COLORS.black2
				innerOutline = getBorderOutlineStyle(COLORS.black3)
			}

			if (state.focused || stateMod === 'hovered') {
				root.color = COLORS.black1
				root.fill = COLORS.black1
				let backgroundColor = Color(COLORS.black4).clone().mix(Color(COLORS.black3), 0.66)
				root.background = backgroundColor
				innerOutline = getBorderOutlineStyle(backgroundColor.rgbaString())
			}

			if (stateMod === 'active') {
				root.color = COLORS.black1
				root.fill = COLORS.black1
				root.background = COLORS.black3
			}

			if (state.focused) innerOutline = {}
		} else {
			let color = COLORS[colorMod]
			if (stateMod === 'initial') {
				root.color = color
				root.fill = color
				innerOutline = getBorderOutlineStyle(color)
			}

			if (state.focused || stateMod === 'hovered') {
				root.color = 'white'
				root.fill = 'white'
				root.background = color
				innerOutline = getBorderOutlineStyle(color)
			}

			if (stateMod === 'active') {
				root.color = 'white'
				root.fill = 'white'
				root.background = Color(color).clone().mix(Color('black'), 0.85)
			}

			if (state.focused) innerOutline = getWhitelineStyle()
		}

		outerOutline = getOuterOutlineStyle(state.focused)
	}

	return {root, label, rightIcon, leftIcon, innerOutline, outerOutline}
}

export default class FlatButton extends Button {
	static defaultProps = {
		...Button.defaultProps,
		color: 'grey'
	}

	static propTypes = {
		...Button.propTypes,
		color: React.PropTypes.string
	}

	static styles = composeStyles(Button.styles, getStyles)
}
