Feature: Minesweeper
            As a player:
            - I want to play to the classic minesweeper game
            - So I want to detect all the mines in the board
            How to refer to a cell:
            - Using the (row,column) nomenclature
            - Rows and columns starts from 1
            How to load mock data:
            - Using the <ctrl>+m keyboard combination to discover
            the load mock data form
            To define the board data will use:
            "o" No mine
            "*" Mine
            "-" Row separator
            Thera are two ways to define mock data:
            - Inline:
            "***-ooo-*oo"
            - Table:
            | * | * | * |
            | o | o | o |
            | * | o | o |
    To define the board display will use:
    COVERED CELLS
    "." Hidden cell
    "!" Cell tagged has mined cell by the user
    "?" Cell tagged has inconclusive cell by the user
    "x" Cell wrongly tagged has no mined cell by the user
    UNCOVERED CELLS
    "0" Empty cell
    "1" Clean cell with 1 adjacent mine
    "2" Clean cell with 2 adjacent mines
    "3" Clean cell with 3 adjacent mines
    "4" Clean cell with 4 adjacent mines
    "5" Clean cell with 5 adjacent mines
    "6" Clean cell with 6 adjacent mines
    "7" Clean cell with 7 adjacent mines
    "8" Clean cell with 8 adjacent mines
    "9" Clean cell with 9 adjacent mines
    "@" highlighted mine
    Game example: http://birrell.org/andrew/minesweeper/
    Background:
        Given the player opens the game

    @Single
    Scenario: Starting game - All the cells should be hidden
        Then all the cells should be covered
   
#    Scenario: Starting game - All the cells should be enabled
#         Then all the cells should be enabled
   
#     Scenario: Uncovering a cell - Disabling the cell
#         Given the player loads the following mock data:
#             """
#             | * | o |
#             """
#         When the player uncovers the cell (1,2)
#         Then the cell (1,2) should be disabled
    
#     Scenario: Tagging a "!" tag with the mouse right button
#         Given the player loads the following mock data:
#             """
#             | * | o |
#             """
#         When the player clicks the right button on the (1,1) cell
#         Then the cell should show the "!" tag
   
#     Scenario: Tagging a "?" tag with the mouse right button
#         Given the player loads the following mock data:
#             """
#             | * | o |
#             """
#         When the player clicks the right button on the (1,1) cell
#         And the cell should show the "!" tag
#         And the player clicks the right button on the (1,1) cell
#         Then the cell should show the "?" tag
   
#     Scenario: Removing a "!" tag with the mouse right button
#         Given the player loads the following mock data:
#             """
#             | * | o |
#             """
#         When the player tags the (1,1) cell with the "!"
#         And the player clicks the right button on the (1,1) cell
#         And the player clicks the right button on the (1,1) cell
#         Then the cell should show no tag
   
#     Scenario: Removing a "?" tag with the mouse right button
#         Given the player loads the following mock data:
#             """
#             | * | o |
#             """
#         When the player tags the (1,1) cell with the "?"
#         And the player clicks the right button on the (1,1) cell
#         Then the cell should show no tag
    
#     Scenario: Removing a "!" tag by uncovering a cell
#         Given the player loads the following mock data:
#             """
#             | * | o |
#             """
#         When the player tags (1,2) cell with a "!" tag
#         And the player uncovers the (1,2) cell
#         Then the cell should be uncovered
    
#     Scenario: Removing a "?" tag by uncovering a cell
#         Given the player loads the following mock data:
#             """
#             | * | o |
#             """
#         When the player tags (1,2) cell with a "?" tag
#         And the player uncovers the (1,2) cell
#         Then the cell should be uncovered
    
#     Scenario: Uncovering a cell - Showing the number of mines around
#         Given the player loads the following mock data: '<data>'
#         When the player uncovers the cell (2,2)
#         Then the cell should show the following number '<number>'

#         Examples:
#             | data          | number |
#             | "*oo-ooo-ooo" | 1      |
#             | "**o-ooo-ooo" | 2      |
#             | "***-ooo-ooo" | 3      |
#             | "***-*oo-ooo" | 4      |
#             | "***-*o*-ooo" | 5      |
#             | "***-*o*-*oo" | 6      |
#             | "***-*o*-***" | 7      |
#             | "***-*o*-***" | 8      |
    
#     Scenario: Uncovering a cell - No mines around
#         Given the player loads the following mock data:
#             """
#             | o | o | o |
#             | o | o | o |
#             | o | o | o |
#             """
#         When the player uncovers the (2,2) cell
#         Then the cell should show no number
   
#     Scenario: Uncovering a mine
#         Given the player loads the following mock data:
#             """
#             | * | o |
#             """
#         When the player uncovers the cell (1,1)
#         Then the (1,1) cell should show a "@" mine
    
#     Scenario: Tagging a mine right with "!" tag
#         Given the player loads the following mock data:
#             """
#             | * | o | * |
#             """
#         When the player tags the (1,1) cell with a "!"
#         And  the player uncovers the cell (1,3)
#         Then the (1,1) cell should show the "!" tag
#     Scenario: Tagging a mine right with "?" tag
#         Given the player loads the following mock data:
#             """
#             | * | o | * |
#             """
#         When the player tags the (1,1) cell with a "?" tag
#         And  the player uncovers the cell (1,3)
#         Then the (1,1) cell should show the "!" tag
#     Scenario: No "!" tagging allowed - Game Over
#         Given the player loads the following mock data:
#             """"
#             | * | o |
#             """
#         When the player uncovers the cell (1,1)
#         And the player pressed the right mouse button on the (1,2) cell
#         Then the (1,2) cell should show no tag
#     Scenario: No "!" tagging allowed - Win the game
#         Given the player loads the following mock data:
#             """
#             | * | o |
#             """
#         When the player uncovers the cell (1,2)
#         And the player pressed the right mouse button on the (1,2) cell
#         Then the (1,2) cell should show no tag
#     Scenario: No "!" tagging allowed - Uncovered empty cell
#         Given the player loads the following mock data:
#             """
#             | * | o | o |
#             """
#         When the player uncovers the cell (1,3)
#         And the player pressed the right mouse button on the (1,3) cell
#         Then the (1,3) cell should show no tag
#     Scenario: No "!" tagging allowed - Uncovered cell with mines around
#         Given the player loads the following mock data:
#             """
#             | * | * | o |
#             """
#         When the player uncovers the cell (1,3)
#         And the player pressed the right mouse button on the (1,3) cell
#         Then the (1,3) cell should show no tag
#     Scenario: No tag removing allowed - Game Over
#         Given the player loads the following mock data:
#             """
#             | * | o | * |
#             """
        
#         And the player tags the (1,1) cell with a "!" tag
#         When the player uncovers the cell (1,3)
#         And the player pressed the left mouse button on the (1,1) cell
#         Then the (1,1) cell should show a "!" tag
#      Scenario: No tag removing allowed - Win the game
#         Given the player loads the following mock data:
#             """
#             | * | o |
#             """
#         When the player uncovers the cell (1,2)
#         And the player pressed the left mouse button on the (1,1) cell
#         Then the (1,1) cell should show a "!" tag
#     Scenario: Game Over - Disabling all cells by exploding a mine
#         Given the player loads the following mock data:
#             """
#             | * | o |
#             """
#         When the player uncovers the cell (1,1)
#         Then all cells should be disabled
#     Scenario: Game Over - Wrongly tagging a mine with "!"
#         Given the player loads the following mock data:
#             """
#             | * | o |
#             """
#         When the player tags the (1,2) cell with a "!"
#         And  the player uncovers the cell (1,1)
#         Then the (1,2) cell should show the "x" tag
#     Scenario: Game Over - Wrongly tagging a mine with "?"
#         Given the player loads the following mock data:
#             """
#             | * | o |
#             """
#         When the player tags the (1,2) cell with a "?"
#         And  the player uncovers the cell (1,1)
#         Then the (1,2) cell should show the "?" tag
#     Scenario: Game Over - Uncovering all mines
#         Given the player loads the following mock data:
#             """
#             | * | o | * |
#             | o | o | o |
#             | o | * | o |
#             """
#         When the player uncovers the cell (1,1)
#         And the (1,3),(3,2) cells should be uncovered
#     Scenario: Win the Game - Tagging a mine right
#         Given the player loads the following mock data:
#             """
#             | * | o |
#             """
#         When the player tags the (1,1) cell with "!"
#         And  the player uncovers the cell (1,2)
#         Then the (1,1) cell should show the "!" tag
#     Scenario: Win the Game - Automatically tagging all mines
#         Given the player loads the following mock data:
#             """
#             | o | * | * | * |
#             """
#         When the player uncovers the (1,1) cell
#         Then the following cells should be tagged with "!": (1,2),(1,3),(1,4)
#     Scenario: Win the Game - Automatically tagging all mines tagged with "?"
#         Given the player loads the following mock data:
#             """
#             | o | * | * |
#             """
#         When the player tags the (1,2) cell with the "?" tag
#         And the player uncovers the (1,1) cell
#         Then the following cells should be tagged with "!": (1,2),(1,3)
#     Scenario: Uncovering empty cells in cascade - Mines around
#         Given the player loads the following mock data:
#             """
#             | o | * | * | o |
#             | o | o | * | * |
#             | * | o | o | o |
#             """
#         When the player uncovers the (1,1) cell
#         Then the following cells should be uncovered: (1,1)
#     Scenario: Uncovering empty cells in cascade - No mines around
#         Given the player loads the following mock data:
#             """
#             | o | o | * | o |
#             | o | o | * | * |
#             | * | o | o | o |
#             """
#         When the player uncovers the (1,1) cell
#         Then the following cells should be uncovered: (1,1),(1,2),(2,1),(2,2)
#     Scenario: Uncovering empty cells in cascade - Next to a "!" tag
#         Given the player loads the following mock data:
#             """
#             | o | o | o | * |
#             """
#         When the player tags the (1,2) cell with the "!" tag
#         And the player uncovers the (1,1) cell
#         Then the following cells should be uncovered: (1,1)
#     Scenario: Uncovering empty cells in cascade - Next to a "?" tag
#         Given the player loads the following mock data:
#             """
#             | o | o | o | * |
#             """
#         When the player tags the (1,2) cell with the "?" tag
#         And the player uncovers the (1,1) cell
#         Then the following cells should be uncovered: (1,1),(1,2),(1,3)
#     Scenario: Uncovering empty cells in cascade - More complex cascading - Case 1
#         Given the player loads the following mock data:
#             """
#             | o | o | o | o |
#             | o | o | o | * |
#             | o | o | o | o |
#             """
#         When the player uncovers the (1,1) cell
#         Then the following cells should be covered: (2,4)
#     Scenario: Uncovering empty cells in cascade - More complex cascading - Case 2
#         Given the player loads the following mock data:
#             """
#             | o | o | o | o |
#             | o | * | o | o |
#             | o | o | o | o |
#             """
#         When the player uncovers the (2,4) cell
#         Then the following cells should be covered: (1,1),(2,1),(3,1)
#     Scenario: Uncovering empty cells in cascade - More complex cascading - Case 3
#         Given the player loads the following mock data:
#             """
#             | o | o | o | o |
#             | o | * | o | o |
#             | o | o | o | o |
#             """
#         When the player uncovers the (2,3) cell
#         Then the following cells should be covered: (1,3),(2,4),(3,3)
#     Scenario: Updating the counter by placing tags
#         Given the player loads the following mock data:
#             """
#             | * | o | * |
#             """
#         When the player tags with the "!" tag the following cells:(1,1),(1,3)
#         Then the counter should show the following value: 8
#     Scenario: Updating the counter by removing tags
#         Given the player loads the following mock data:
#             """
#             | * | o | * |
#             """
#         When the player tags with the "!" tag the following cells:(1,1),(1,3)
#         And the player removes tags from the following cells: (1,1),(1,3)
#         Then the counter should show the following value: 10
#     Scenario: Updating the counter by removing tags - Going into negatives
#         Given the player loads the following mock data:
#             """
#             | * | o | * | o |
#             | o | o | o | o |
#             | o | o | o | o |
#             | o | o | o | o |
#             | o | o | * | o |
#             """
#         When the player tags with the "!" tag the following cells:(1,1),(1,2),(1,3),(1,4),(2,1),(2,2),(2,3),(2,4),(3,1),(3,2),(3,3)
#         Then the counter should show the following value: -1
#     Scenario: The "?" symbol shouldn't update the counter
#         Given the player loads the following mock data:
#             """
#             | * | o |
#             """
#         When the player tags the (1,1) cell with "?" tag
#         Then the counter should display the following value: 10
#     Scenario: Starting the timer - Uncovering a cell
#         Given the player loads the following mock data:
#             """
#             | * | o | * |
#             """
#         When the player uncovers the (1,1) cell
#         And the player waits 1 second
#         Then the timer should by bigger than 0
#     Scenario: Displaying the smiley face
#         Then the smiley face should show the following status: neutral
#     Scenario: Game over - Updating the smiley face
#         Given the player loads the following mock data:
#             """
#             | * | o |
#             """
#         When the player uncovers the (1,1) cell
#         Then the smiley face should show the following status: sad
#     Scenario: Win the game - Updating the smiley face
#         Given the player loads the following mock data:
#             """
#             | * | o |
#             """
#         When the player uncovers the (1,2) cell
#         Then the smiley face should show the following status: happy
#     Scenario: Reset game - Covering all cells
#         Given the player loads the following mock data:
#             """
#             | * | o |
#             """
#         When the player uncovers the (1,1) cell
#         And the player clicks on the smiley face
#         Then the (1,1) cell should be covered
#     Scenario: Reset game - Enabling all cells
#         Given the player loads the following mock data:
#             """
#             | * | o |
#             """
#         When the player uncovers the (1,1) cell
#         And the player clicks on the smiley face
#         Then the (1,1) cell should be enabled
#     Scenario: Reset game - Reseting the counter
#         Given the player loads the following mock data:
#             """
#             | * | o |
#             """
#         When the player uncovers the (1,1) cell
#         And the player clicks on the smiley face
#         Then the counter should show the following value: 10
#     Scenario: Reset game - Reseting the smiley face
#         Given the player loads the following mock data:
#             """
#             | * | o |
#             """
#         When the player uncovers the (1,1) cell
#         And the player clicks on the smiley face
#         Then the smiley face should show the following status: neutral

    