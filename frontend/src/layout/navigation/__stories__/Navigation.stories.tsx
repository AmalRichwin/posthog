import React from 'react'
import { Meta } from '@storybook/react'
import { Layout } from 'antd'
import { keaStory } from 'storybook/kea-story'
import navigationInitial from './navigation.initial.json'
import { TopBar } from '../TopBar/TopBar'
import { SideBar } from '../SideBar/SideBar'

export default {
    title: 'Layout/Navigation',
    parameters: {
        layout: 'fullscreen',
    },
} as Meta

export const Navigation = keaStory(
    () => (
        <Layout>
            <TopBar />
            <SideBar>
                <React.Fragment />
            </SideBar>
        </Layout>
    ),
    navigationInitial
)
