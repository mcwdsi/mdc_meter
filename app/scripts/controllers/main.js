'use strict';



/**
 * @ngdoc function
 * @name obc-grants.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the obc-grants
 */
angular.module('mdcSearch') 
    .controller('MainCtrl', function ($scope, $location, $http,$q, $modal) {
    	var pathogensDict = {}
    	var hostsDict = {}
    	var locationsDict = {}
    	var measuresDict = {}
    	$scope.showSearch = false;
    	$scope.showOptionSearch = false;
        var APIURL = 'http://localhost:3000';
        var configName = $location.search().configName;
        $http.get(APIURL + '/meter', {
            params: {
                type:"software",
            }
            }).success(function (software_data) {
                $http.get(APIURL + '/meter', {
                params: {
                    type:"dataset",
                }
                }).success(function (dataset_data) {
                   $scope.sw_data = process_software(software_data)
                   $scope.ds_data = process_dataset(dataset_data)
                   $scope.totals = process_totals(software_data,dataset_data)
                });
        });
    function process_totals(sw,ds){
        var item = {};
        item["total"] = parseInt(sw.total_sw) + parseInt(ds.total_ds)
        item["doi_total"] = parseInt(sw.sw_with_doi) + parseInt(ds.ds_with_doi)
        item["any_identifier_total"] = parseInt(sw.sw_with_any_identifier) +parseInt(ds.ds_with_any_identifier)
        item["common_format_total"] = parseInt(sw.sw_with_common_format) +parseInt(ds.ds_with_common_format)
        item["reusable_lic_total"] = parseInt(sw.sw_with_reusable_lic) +parseInt(ds.ds_with_reusable_lic)        
        item["common_lic_total"] = parseInt(sw.sw_with_common_lic) +parseInt(ds.ds_with_common_lic)
        item["input_total"] = sw.sw_with_input + " (N/A)"
        item["output_total"] = sw.sw_with_output + " (N/A)"
        item["io_total"] = sw.sw_with_io+ " (N/A)"
        //now calculate percentages
        item["doi_total_percent"] = (item.doi_total/item.total * 100).toFixed(2)
        item["any_identifier_total_percent"] = (item.any_identifier_total/item.total * 100).toFixed(2)
        item["common_format_total_percent"] = (item.common_format_total/item.total * 100).toFixed(2)
        item["reusable_lic_total_percent"] = (item.reusable_lic_total/item.total * 100).toFixed(2)
        item["common_lic_total_percent"] = (item.common_lic_total/item.total * 100).toFixed(2)

        return item;
    }

    function process_software(data){
    	var item = data;
        item["sw_with_doi_percent"] = (data.sw_with_doi/data.total_sw * 100).toFixed(2)
        item["sw_with_common_format_percent"] = (data.sw_with_common_format/data.total_sw* 100).toFixed(2)
        item["sw_with_common_lic_percent"] = (data.sw_with_common_lic/data.total_sw* 100).toFixed(2)
        item["sw_with_input_percent"] = (data.sw_with_input/data.total_sw* 100).toFixed(2)
        item["sw_with_io_percent"] = (data.sw_with_io/data.total_sw* 100).toFixed(2)
        item["sw_with_output_percent"] = (data.sw_with_output/data.total_sw* 100).toFixed(2)
        item["sw_with_reusable_lic_percent"] = (data.sw_with_reusable_lic/data.total_sw* 100).toFixed(2)
        item["sw_with_any_identifier_percent"] = (data.sw_with_any_identifier/data.total_sw* 100).toFixed(2)
    	return item;
    }

    function process_dataset(data){
        var item = data;
        if(data.ds_with_common_format == 0){
            item.ds_with_common_format = 0
        }
        else {
            item["ds_with_common_format_percent"] = (data.ds_with_common_format/data.total_ds *100).toFixed(2)
        }
        if(data.ds_with_reusable_lic == 0){
            item.ds_with_reusable_lic = 0
        }
        else {
            item["ds_with_reusable_lic_percent"] = (data.ds_with_reusable_lic/data.total_ds *100).toFixed(2)
        }
        item["ds_with_any_identifier_percent"] = (data.ds_with_any_identifier/data.total_ds *100).toFixed(2)
        item["ds_with_common_lic_percent"] = (data.ds_with_common_lic/data.total_ds *100).toFixed(2)
        item["ds_with_doi_percent"] = (data.ds_with_doi/data.total_ds *100).toFixed(2)
        
       console.log(data)
        return item;
    }



      $scope.getItemDetails = function (item) {
	    $modal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: 'views/modals/detail-modal.html',
	      controller: 'DetailModalInstanceController',
	      size: 'lg',
	      resolve: {
	        item: function () {
	          return item;
	        },
	        isNewItem: function () {
	          return false;
	        },
	        indexingTerms: function () {
	          return $scope.indexingTerms;
	        },
	        indexingTermsIndex: function () {
	          return $scope.indexingTermsIndex;
	        }
	      }
	    });
  };
       


})




