import QtQuick 6.5
import QtQuick.Layouts 1.15
import QtQuick.Window 2.15

Window {
    id: root
    width: 1280
    height: 720
    visible: true
    title: "Calm Canvas"
    color: "#c7d3df"

    readonly property real scaleFactor: Math.min(width / 1920, height / 1080)
    readonly property real outerMargin: 28 * scaleFactor
    readonly property real sectionSpacing: 20 * scaleFactor
    readonly property real cornerRadius: 20 * scaleFactor
    readonly property real liftAmount: 4 * scaleFactor

    readonly property color baseInk: Qt.rgba(0.18, 0.24, 0.32, 0.8)
    readonly property color softInk: Qt.rgba(0.22, 0.28, 0.36, 0.65)

    Rectangle {
        id: backdrop
        anchors.fill: parent
        gradient: Gradient {
            GradientStop { position: 0.0; color: Qt.rgba(0.80, 0.86, 0.92, 0.75) }
            GradientStop { position: 1.0; color: Qt.rgba(0.72, 0.80, 0.88, 0.7) }
        }
    }

    Row {
        id: layoutRow
        anchors {
            fill: parent
            margins: outerMargin
        }
        spacing: sectionSpacing

        Rectangle {
            id: leftMass
            width: (layoutRow.width - layoutRow.spacing) * 0.58
            height: layoutRow.height
            radius: cornerRadius
            opacity: 0.72
            gradient: Gradient {
                GradientStop { position: 0.0; color: Qt.rgba(0.66, 0.74, 0.84, 0.78) }
                GradientStop { position: 1.0; color: Qt.rgba(0.56, 0.65, 0.76, 0.68) }
            }

            HoverHandler { id: leftHover }
            TapHandler {
                onTapped: leftMass.forceActiveFocus()
            }

            property bool activeState: leftHover.hovered || leftMass.activeFocus
            y: activeState ? -liftAmount : 0
            opacity: activeState ? 0.8 : 0.72

            Behavior on y {
                NumberAnimation { duration: 220; easing.type: Easing.InOutQuad }
            }
            Behavior on opacity {
                NumberAnimation { duration: 220; easing.type: Easing.InOutQuad }
            }
        }

        Rectangle {
            id: rightPanel
            width: (layoutRow.width - layoutRow.spacing) * 0.42
            height: layoutRow.height
            radius: cornerRadius
            opacity: 0.68
            gradient: Gradient {
                GradientStop { position: 0.0; color: Qt.rgba(0.74, 0.82, 0.9, 0.75) }
                GradientStop { position: 1.0; color: Qt.rgba(0.64, 0.72, 0.82, 0.65) }
            }

            HoverHandler { id: rightHover }
            TapHandler {
                onTapped: rightPanel.forceActiveFocus()
            }

            property bool activeState: rightHover.hovered || rightPanel.activeFocus
            y: activeState ? -liftAmount : 0
            opacity: activeState ? 0.75 : 0.68

            Behavior on y {
                NumberAnimation { duration: 220; easing.type: Easing.InOutQuad }
            }
            Behavior on opacity {
                NumberAnimation { duration: 220; easing.type: Easing.InOutQuad }
            }

            ColumnLayout {
                id: contentColumn
                anchors {
                    fill: parent
                    margins: sectionSpacing
                }
                spacing: sectionSpacing

                Item {
                    id: titleBlock
                    Layout.fillWidth: true
                    height: titleText.implicitHeight

                    HoverHandler { id: titleHover }
                    TapHandler { onTapped: titleBlock.forceActiveFocus() }

                    property bool activeState: titleHover.hovered || titleBlock.activeFocus
                    y: activeState ? -liftAmount : 0
                    opacity: activeState ? 0.85 : 0.75

                    Behavior on y {
                        NumberAnimation { duration: 200; easing.type: Easing.InOutQuad }
                    }
                    Behavior on opacity {
                        NumberAnimation { duration: 200; easing.type: Easing.InOutQuad }
                    }

                    Text {
                        id: titleText
                        text: "Quiet mathematics"
                        color: baseInk
                        font.pixelSize: 34 * scaleFactor
                        font.weight: Font.DemiBold
                        anchors.left: parent.left
                    }
                }

                Item {
                    id: subtitleBlock
                    Layout.fillWidth: true
                    height: subtitleText.implicitHeight

                    HoverHandler { id: subtitleHover }
                    TapHandler { onTapped: subtitleBlock.forceActiveFocus() }

                    property bool activeState: subtitleHover.hovered || subtitleBlock.activeFocus
                    y: activeState ? -liftAmount : 0
                    opacity: activeState ? 0.8 : 0.65

                    Behavior on y {
                        NumberAnimation { duration: 210; easing.type: Easing.InOutQuad }
                    }
                    Behavior on opacity {
                        NumberAnimation { duration: 210; easing.type: Easing.InOutQuad }
                    }

                    Text {
                        id: subtitleText
                        text: "Open an idea and let it settle"
                        color: softInk
                        font.pixelSize: 18 * scaleFactor
                        anchors.left: parent.left
                    }
                }

                Rectangle {
                    id: searchField
                    Layout.fillWidth: true
                    height: 54 * scaleFactor
                    radius: cornerRadius * 0.8
                    opacity: 0.6
                    gradient: Gradient {
                        GradientStop { position: 0.0; color: Qt.rgba(0.78, 0.84, 0.9, 0.7) }
                        GradientStop { position: 1.0; color: Qt.rgba(0.7, 0.76, 0.84, 0.6) }
                    }

                    HoverHandler { id: searchHover }
                    TapHandler { onTapped: searchField.forceActiveFocus() }

                    property bool activeState: searchHover.hovered || searchField.activeFocus
                    y: activeState ? -liftAmount : 0
                    opacity: activeState ? 0.72 : 0.6

                    Behavior on y {
                        NumberAnimation { duration: 230; easing.type: Easing.InOutQuad }
                    }
                    Behavior on opacity {
                        NumberAnimation { duration: 230; easing.type: Easing.InOutQuad }
                    }

                    Text {
                        text: "Search concepts"
                        color: softInk
                        font.pixelSize: 16 * scaleFactor
                        anchors.verticalCenter: parent.verticalCenter
                        anchors.left: parent.left
                        anchors.leftMargin: sectionSpacing
                    }
                }

                GridLayout {
                    id: cardGrid
                    columns: 2
                    columnSpacing: sectionSpacing
                    rowSpacing: sectionSpacing
                    Layout.fillWidth: true
                    Layout.fillHeight: true

                    Repeater {
                        model: 4
                        Rectangle {
                            id: conceptCard
                            Layout.fillWidth: true
                            Layout.preferredHeight: 96 * scaleFactor
                            radius: cornerRadius * 0.75
                            opacity: 0.58
                            gradient: Gradient {
                                GradientStop { position: 0.0; color: Qt.rgba(0.76, 0.82, 0.88, 0.65) }
                                GradientStop { position: 1.0; color: Qt.rgba(0.66, 0.72, 0.8, 0.55) }
                            }

                            HoverHandler { id: cardHover }
                            TapHandler { onTapped: conceptCard.forceActiveFocus() }

                            property bool activeState: cardHover.hovered || conceptCard.activeFocus
                            y: activeState ? -liftAmount : 0
                            opacity: activeState ? 0.7 : 0.58

                            Behavior on y {
                                NumberAnimation { duration: 240; easing.type: Easing.InOutQuad }
                            }
                            Behavior on opacity {
                                NumberAnimation { duration: 240; easing.type: Easing.InOutQuad }
                            }
                        }
                    }
                }
            }
        }
    }
}
