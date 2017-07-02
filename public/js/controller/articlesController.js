// articlesController.js
// =====================
// controller for 'articles' view

angular.module('pyrite')
    .controller('articlesController', ['$scope', '$rootScope', '$routeParams', '$location',
                                       '$window', 'appConfig', 'likertValuesDB', 'cookieService',
                                       'dbService', 'articleService', 'progressService',
        function($scope, $rootScope, $routeParams, $location, $window, appConfig,
                 likertValuesDB, cookieService, dbService, articleService, progressService) {
            // == set up page info =============================================
            $scope.showSpontaneousResponse = false; //hide response modal initially
            $scope.index = parseInt($routeParams.index); //get article index from URL

            //fallback to cookieService handles $rootScope wipe on refresh
            $scope.articleOrder = ($rootScope.articleOrder != undefined) ?
                $rootScope.articleOrder : cookieService.getArticleOrder();
            $scope.articlePath = $scope.articleOrder[$scope.index]; //get articlePath
            $scope.articleID = $scope.articlePath.split('_')[1].split('.')[0];

            //response modal styles
            $scope.highlightStyle = {};
            $scope.responseStyle = {};

            //set counter variables
            $scope.pageTimeStart = Date.now(); //start response timer
            $scope.SRCount = 0; //set Spontaneous Response counter to 0
            $scope.moreBelievableCount = 0; //set "more believable" Spontaneous Response counter to 0

            //display parameters
            $scope.numTrials = articleService.getNumTrials();
            $scope.width = (50 / $scope.numTrials) * ($scope.index + 1)

            // == function definitions =========================================
            // ---- likert response functions ----------------------------------
            //validation that an option has been selected within the likert scale
            $scope.likertSelected = function() {
                return ($scope.likert != undefined);
            }

            //submit likert response to current article to DB, and transition to the next article
            $scope.submitArticleResponse = function() {
                var pageTimeEnd = Date.now(); //stop response timer
                $scope.index++; //advance to next trial

                //build article response
                var articleResponse =  {
                    subjectID: cookieService.getSubjectID(),
                    trial: $scope.index, //registered after increment because trials are 1-based rather than 0-based
                    articleID: $scope.articleID,
                    likert: likertValuesDB[$scope.likert], //transform text value into number for DB use
                    pageTime: pageTimeEnd - $scope.pageTimeStart, //time to respond, in ms
                    SRCount: $scope.SRCount, //number of spontaneous responses to this article
                    moreBelievableCount: $scope.moreBelievableCount //number of those responses which were "more believable"
                }

                //store in database
                dbService.registerArticleResponse(articleResponse);

                //if articles remaining, continue; else, go to next stage of experiment
                if ($scope.index < $scope.numTrials) {
                    progressService.setArticleIndex($scope.index);
                    $location.path('/articles/' + $scope.index);
                } else {
                    progressService.setStage('review');
                    progressService.setArticleIndex(0);
                    $location.path('/review');
                }
            }

            // ---- spontaneous response functions -----------------------------
            //set dimensions and position of highlight box based on bounding
            //rectangle of selected element
            $scope.setHighlightStyling = function(boundingRectangle) {
                //calculate size of highlight box:
                //extend box to be "outside" of element borders
                var extendDimension = 10; //experimentally determined
                var width = boundingRectangle.right - boundingRectangle.left + extendDimension;
                var height = boundingRectangle.bottom - boundingRectangle.top + extendDimension;

                //calculate position of highlight box:
                //account for scroll with pageYOffset / pageXOffset
                var positionOffset = -25; //experimentally determined
                var top = boundingRectangle.top + $window.pageYOffset + positionOffset;
                var left = boundingRectangle.left + $window.pageXOffset + positionOffset;

                //set position and dimensions of highlight box
                $scope.highlightStyle = {
                    'top'    : top + "px",
                    'left'   : left + "px",
                    'width'  : width + "px",
                    'height' : height + "px"
                };
            }

            //set position of response callout based on bounding rectange of
            //selected element
            $scope.setResponseStyling = function(boundingRectangle) {
                var elementWidth = boundingRectangle.right - boundingRectangle.left
                var elementCenterX = (elementWidth / 2) + boundingRectangle.right + $window.pageXOffset;
                var modalWidth = 316;
                //set position of response callout:
                //account for scroll with pageYOffset / pageXOffset
                var topOffset = -3; //experimentally determined
                var leftOffset = -19; //experimentally determined
                $scope.responseStyle= {
                    'top'  : boundingRectangle.bottom + $window.pageYOffset + topOffset + "px",
                    'left' : boundingRectangle.left + $window.pageXOffset + (elementWidth / 2) - (modalWidth / 2) + leftOffset + "px",
                };
            }

            //handle UI changes when user selects an article element
            $scope.selectElement = function(event) {
                //get bounding rectange of selected element
                var selected = document.elementFromPoint(event.pageX - $window.pageXOffset,
                                                         event.pageY - $window.pageYOffset);
                var rect = selected.getBoundingClientRect(); //for UI dimensions/position

                //for storage in database
                $scope.selectedID = selected.id;

                //set dimensions and position of highlight box
                $scope.setHighlightStyling(rect);

                //set position of response callout
                $scope.setResponseStyling(rect);

                //now that they are configured, show highlight box and
                //response callout
                $scope.showSpontaneousResponse = true;
            }

            //hide spontaneous response
            $scope.hideSpontaneousResponse = function() {
                $scope.showSpontaneousResponse = false;
            }

            //submit a "spontaneous response" to an article element
            $scope.submitSpontaneousResponse = function(val) {
                //increment counters
                $scope.SRCount++;
                if (val == 'more-believable') $scope.moreBelievableCount++;

                //construct spontaneousResponse object
                var spontaneousResponse = {
                    subjectID: cookieService.getSubjectID(),
                    trial: $scope.index + 1, // + 1 because trials are 1-based instead of 0 based
                    articleID: $scope.articleID,
                    elementID: $scope.selectedID,
                    moreBelievable: (val == 'more-believable') ? 1 : 0 //1 = true, 0 = false
                }

                //store in database
                dbService.registerSpontaneousResponse(spontaneousResponse);

                //hide spontaneous response UI
                $scope.hideSpontaneousResponse();
            }
        }
    ]);
