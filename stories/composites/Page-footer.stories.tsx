import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { PageFooter } from './Page-footer'

export default {
    title: 'Composites/Page Footer',
    component: PageFooter,
} as ComponentMeta<typeof PageFooter>

const Template: ComponentStory<typeof PageFooter> = () => {
    return <PageFooter />
}
export const pageFooter = Template.bind({})
