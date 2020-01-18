package main

import (
	. "github.com/ttimt/Short_Cutteer/hook/windows"
)

// Create base tag input keyboard template
func tagInputKeyboard() TagINPUT {
	return TagINPUT{
		InputType: INPUT_KEYBOARD,
	}
}

// Create tag input for SHIFT key down
func tagInputShiftDown() TagINPUT {
	tagInput := tagInputKeyboard()
	tagInput.Ki.WVk = VK_SHIFT

	return tagInput
}

// Create tag input for SHIFT key up by adding key event flag with SHIFT key down
func tagInputShiftUp() TagINPUT {
	tagInput := tagInputShiftDown()
	tagInput.Ki.DwFlags = KEYEVENTF_KEYUP

	return tagInput
}

// Create tag input for CTRL key down
func tagInputCtrlDown() TagINPUT {
	tagInput := tagInputKeyboard()
	tagInput.Ki.WVk = VK_CONTROL

	return tagInput
}

// Create tag input for CTRL key up
func tagInputCtrlUp() TagINPUT {
	tagInput := tagInputCtrlDown()
	tagInput.Ki.DwFlags = KEYEVENTF_KEYUP

	return tagInput
}

// Create tag input for ALT key down
func tagInputAltDown() TagINPUT {
	tagInput := tagInputKeyboard()
	tagInput.Ki.WVk = VK_MENU

	return tagInput
}

// Create tag input for ALT key up
func tagInputAltUp() TagINPUT {
	tagInput := tagInputAltDown()
	tagInput.Ki.DwFlags = KEYEVENTF_KEYUP

	return tagInput
}

// Create tag input for LEFT ARROW key down
func tagInputLeftArrowDown() TagINPUT {
	tagInput := tagInputKeyboard()
	tagInput.Ki.WVk = VK_LEFT

	return tagInput
}

// Create tag input for UP ARROW key down
func tagInputUpArrowDown() TagINPUT {
	tagInput := tagInputKeyboard()
	tagInput.Ki.WVk = VK_UP

	return tagInput
}

// Create tag input for RIGHT ARROW key down
func tagInputRightArrowDown() TagINPUT {
	tagInput := tagInputKeyboard()
	tagInput.Ki.WVk = VK_RIGHT

	return tagInput
}

// Create tag input for DOWN ARROW key down
func tagInputDownnArrowDown() TagINPUT {
	tagInput := tagInputKeyboard()
	tagInput.Ki.WVk = VK_DOWN

	return tagInput
}
