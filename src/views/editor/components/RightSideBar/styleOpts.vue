<template>
    <div class="style-opts">
        <v-expansion-panels v-model="panel" multiple>
            <v-expansion-panel>
                <v-expansion-panel-header>
                    <span class="expansion-header">Display</span>
                    <template #actions>
                        <v-icon color="indigo lighten-4">$expand</v-icon>
                    </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-row>
                        <v-col v-for="(item, key) in displayAndPosition" :key="key" cols="6">
                            <v-select :label="key" hide-details dense outlined :items="item"></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col v-for="item in offset" :key="item" cols="6">
                            <v-text-field
                                hide-details
                                dense
                                outlined
                                :label="item"
                                placeholder="单位默认px"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-item-group class="group-opts">
                            <v-item
                                #default="{active, toggle}"
                                v-for="(item, key) in float"
                                :key="item"
                            >
                                <div
                                    class="item"
                                    :class="{active}"
                                    @click="choiceFloat(toggle, key)"
                                    :title="`float: ${key}`"
                                    v-ripple
                                >
                                    <v-icon>{{item}}</v-icon>
                                </div>
                            </v-item>
                        </v-item-group>
                    </v-row>
                    <v-row class="opacity">
                        <v-col>
                            <v-slider
                                label="opacity"
                                hide-details
                                thumb-label
                                step="0.01"
                                max="1"
                                track-color="#e6e6e6"
                                color="indigo lighten-4"
                            ></v-slider>
                        </v-col>
                    </v-row>
                    <v-row>
                        <!-- <v-color-picker></v-color-picker> -->
                        <v-col cols="6">
                            <div class="color-select" label="BackgroundColor">
                                <div class="bar"></div>
                            </div>
                        </v-col>
                        <v-col cols="6">
                            <div class="color-select" label="TextColor">
                                <div class="bar"></div>
                            </div>
                        </v-col>
                    </v-row>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-expansion-panel-header>
                    <span class="expansion-header">Typography</span>
                    <template #actions>
                        <v-icon color="indigo lighten-4">$expand</v-icon>
                    </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-row>
                        <v-col v-for="(item, key) in fontFamilyAndFontWeight" :key="key" cols="6">
                            <v-select :label="key" hide-details dense outlined :items="item"></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-item-group class="group-opts">
                            <v-item
                                #default="{active, toggle}"
                                v-for="(item, key) in textAlign"
                                :key="item"
                            >
                                <div
                                    class="item"
                                    :class="{active}"
                                    @click="choiceFloat(toggle, key)"
                                    :title="`text-align: ${key}`"
                                    v-ripple
                                >
                                    <v-icon>{{item}}</v-icon>
                                </div>
                            </v-item>
                        </v-item-group>
                    </v-row>
                    <v-row>
                        <v-col v-for="item in lineHeightAndLetterSpacing" :key="item" cols="6">
                            <v-text-field
                                hide-details
                                dense
                                outlined
                                :label="item"
                                placeholder="单位默认px"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-item-group class="group-opts">
                            <v-item
                                #default="{active, toggle}"
                                v-for="(item, key) in textDecoration"
                                :key="item"
                            >
                                <div
                                    class="item"
                                    :class="{active}"
                                    @click="choiceFloat(toggle, key)"
                                    :title="`text-decoration: ${key}`"
                                    v-ripple
                                >
                                    <v-icon>{{item}}</v-icon>
                                </div>
                            </v-item>
                        </v-item-group>
                    </v-row>
                    <v-row>
                        <!-- <v-color-picker></v-color-picker> -->
                        <v-col cols="6">
                            <div class="color-select" label="DecorationColor">
                                <div class="bar"></div>
                            </div>
                        </v-col>
                        <v-col cols="6">
                            <v-select
                                hide-details
                                dense
                                outlined
                                label="DecorationStyle"
                                :items="decorationStyle"
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel v-for="(item, key) in textFieldGroup" :key="key">
                <v-expansion-panel-header>
                    <span class="expansion-header">{{key}}</span>
                    <template #actions>
                        <v-icon color="indigo lighten-4">$expand</v-icon>
                    </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-row>
                        <v-col v-for="(textField, index) in item" :key="index" cols="6">
                            <v-text-field
                                hide-details
                                dense
                                outlined
                                :label="textField"
                                placeholder="单位默认px"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-expansion-panel-header>
                    <span class="expansion-header">Border</span>
                    <template #actions>
                        <v-icon color="indigo lighten-4">$expand</v-icon>
                    </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-row>
                        <v-col>
                            <v-select
                                hide-details
                                dense
                                outlined
                                label="style"
                                :items="borderStyle"
                            ></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                                hide-details
                                dense
                                outlined
                                label="width"
                                placeholder="单位默认px"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <div class="color-select" label="color">
                                <div class="bar"></div>
                            </div>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6" v-for="item in borderRadius" :key="item">
                            <v-text-field
                                hide-details
                                dense
                                outlined
                                :label="`${item}Radius`"
                                placeholder="单位默认px"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script>
export default {
    data() {
        return {
            panel: [0],
            displayAndPosition: {
                display: ['block', 'inline-block', 'inline', 'none'],
                position: ['static', 'relative', 'absolute', 'fixed']
            },
            offset: ['top', 'right', 'bottom', 'left'],
            float: {
                none: 'mdi-close',
                left: 'mdi-format-align-left',
                right: 'mdi-format-align-right'
            },
            fontFamilyAndFontWeight: {
                fontFamily: ['default', '微软雅黑'],
                fontWeight: ['100', '200', '300', '400', '500', '600', '700']
            },
            textAlign: {
                none: 'mdi-close',
                left: 'mdi-format-align-left',
                center: 'mdi-format-align-center',
                right: 'mdi-format-align-right',
                justify: 'mdi-format-align-justify'
            },
            lineHeightAndLetterSpacing: ['lineHeight', 'letterSpacing'],
            textDecoration: {
                none: 'mdi-close',
                underLine: 'mdi-format-vertical-align-bottom',
                overLine: 'mdi-format-vertical-align-top',
                lineThrough: 'mdi-format-vertical-align-center',
                underLineAndOverLine: 'mdi-format-wrap-top-bottom'
            },
            decorationStyle: ['sold', 'dashed'],
            textFieldGroup: {
                size: ['width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight'],
                margin: ['top', 'right', 'bottom', 'left'],
                padding: ['top', 'right', 'bottom', 'left']
            },
            borderStyle: ['default', 'sold', 'dotted', 'dashed'],
            borderRadius: ['LeftTop', 'RightTop', 'LeftBottom', 'RightBottom']
        }
    },
    methods: {
        choiceFloat(toggle, value) {
            toggle()
        }
    }
}
</script>

<style lang="less" scoped>
.style-opts {
    .v-input {
        font-size: 12px !important;
    }
    .expansion-header {
        text-transform: capitalize;
        color: @theme;
    }
    .group-opts {
        width: 100%;
        display: flex;
        margin: 12px;
        overflow: hidden;
        line-height: 40px;
        height: 40px;
        .item {
            flex: 1;
            cursor: pointer;
            transition: 0.3s;
            text-align: center;
            border: 1px solid @theme;

            &:first-child {
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
            }

            &:last-child {
                border-top-right-radius: 4px;
                border-bottom-right-radius: 4px;
            }

            + .item {
                border-left: none;
                // border-right: none;
            }
            &.active,
            &:hover {
                background-color: @theme;
                .v-icon {
                    color: white;
                }
            }
            .v-icon {
                color: @theme;
                font-size: 16px;
            }
        }
    }
    .color-select {
        font-size: 12px;
        text-align: center;
        position: relative;
        cursor: pointer;
        border: 1px solid rgba(0, 0, 0, 0.42);
        border-radius: 4px;
        line-height: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        &::before {
            position: absolute;
            left: 6px;
            top: -20px;
            background-color: #fff;
            color: rgba(0, 0, 0, 0.7);
        }
        &::before {
            content: attr(label);
        }

        .bar {
            position: relative;
            width: 100%;
            margin: 0 10px;
            height: 6px;
            background-color: pink;
            border-radius: 2px;
        }
    }

    .opacity {
        position: relative;
        z-index: 1;
    }
}
</style>