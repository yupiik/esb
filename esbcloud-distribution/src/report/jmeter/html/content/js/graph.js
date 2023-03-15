/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 57.0, "minX": 0.0, "maxY": 914.0, "series": [{"data": [[0.0, 57.0], [0.1, 297.0], [0.2, 438.0], [0.3, 490.0], [0.4, 574.0], [0.5, 590.0], [0.6, 595.0], [0.7, 597.0], [0.8, 598.0], [0.9, 599.0], [1.0, 600.0], [1.1, 601.0], [1.2, 601.0], [1.3, 602.0], [1.4, 602.0], [1.5, 603.0], [1.6, 603.0], [1.7, 604.0], [1.8, 604.0], [1.9, 604.0], [2.0, 605.0], [2.1, 605.0], [2.2, 605.0], [2.3, 606.0], [2.4, 606.0], [2.5, 606.0], [2.6, 607.0], [2.7, 607.0], [2.8, 607.0], [2.9, 607.0], [3.0, 607.0], [3.1, 608.0], [3.2, 608.0], [3.3, 608.0], [3.4, 608.0], [3.5, 609.0], [3.6, 609.0], [3.7, 609.0], [3.8, 609.0], [3.9, 609.0], [4.0, 610.0], [4.1, 610.0], [4.2, 610.0], [4.3, 610.0], [4.4, 610.0], [4.5, 611.0], [4.6, 611.0], [4.7, 611.0], [4.8, 611.0], [4.9, 611.0], [5.0, 611.0], [5.1, 612.0], [5.2, 612.0], [5.3, 612.0], [5.4, 612.0], [5.5, 612.0], [5.6, 612.0], [5.7, 612.0], [5.8, 613.0], [5.9, 613.0], [6.0, 613.0], [6.1, 613.0], [6.2, 613.0], [6.3, 613.0], [6.4, 614.0], [6.5, 614.0], [6.6, 614.0], [6.7, 614.0], [6.8, 614.0], [6.9, 614.0], [7.0, 614.0], [7.1, 615.0], [7.2, 615.0], [7.3, 615.0], [7.4, 615.0], [7.5, 615.0], [7.6, 615.0], [7.7, 615.0], [7.8, 616.0], [7.9, 616.0], [8.0, 616.0], [8.1, 616.0], [8.2, 616.0], [8.3, 616.0], [8.4, 616.0], [8.5, 616.0], [8.6, 617.0], [8.7, 617.0], [8.8, 617.0], [8.9, 617.0], [9.0, 617.0], [9.1, 617.0], [9.2, 617.0], [9.3, 618.0], [9.4, 618.0], [9.5, 618.0], [9.6, 618.0], [9.7, 618.0], [9.8, 618.0], [9.9, 618.0], [10.0, 618.0], [10.1, 618.0], [10.2, 619.0], [10.3, 619.0], [10.4, 619.0], [10.5, 619.0], [10.6, 619.0], [10.7, 619.0], [10.8, 619.0], [10.9, 619.0], [11.0, 619.0], [11.1, 620.0], [11.2, 620.0], [11.3, 620.0], [11.4, 620.0], [11.5, 620.0], [11.6, 620.0], [11.7, 620.0], [11.8, 620.0], [11.9, 620.0], [12.0, 621.0], [12.1, 621.0], [12.2, 621.0], [12.3, 621.0], [12.4, 621.0], [12.5, 621.0], [12.6, 621.0], [12.7, 621.0], [12.8, 621.0], [12.9, 622.0], [13.0, 622.0], [13.1, 622.0], [13.2, 622.0], [13.3, 622.0], [13.4, 622.0], [13.5, 622.0], [13.6, 622.0], [13.7, 622.0], [13.8, 622.0], [13.9, 623.0], [14.0, 623.0], [14.1, 623.0], [14.2, 623.0], [14.3, 623.0], [14.4, 623.0], [14.5, 623.0], [14.6, 623.0], [14.7, 623.0], [14.8, 623.0], [14.9, 624.0], [15.0, 624.0], [15.1, 624.0], [15.2, 624.0], [15.3, 624.0], [15.4, 624.0], [15.5, 624.0], [15.6, 624.0], [15.7, 624.0], [15.8, 624.0], [15.9, 624.0], [16.0, 624.0], [16.1, 625.0], [16.2, 625.0], [16.3, 625.0], [16.4, 625.0], [16.5, 625.0], [16.6, 625.0], [16.7, 625.0], [16.8, 625.0], [16.9, 625.0], [17.0, 625.0], [17.1, 625.0], [17.2, 625.0], [17.3, 626.0], [17.4, 626.0], [17.5, 626.0], [17.6, 626.0], [17.7, 626.0], [17.8, 626.0], [17.9, 626.0], [18.0, 626.0], [18.1, 626.0], [18.2, 626.0], [18.3, 626.0], [18.4, 627.0], [18.5, 627.0], [18.6, 627.0], [18.7, 627.0], [18.8, 627.0], [18.9, 627.0], [19.0, 627.0], [19.1, 627.0], [19.2, 627.0], [19.3, 627.0], [19.4, 627.0], [19.5, 627.0], [19.6, 628.0], [19.7, 628.0], [19.8, 628.0], [19.9, 628.0], [20.0, 628.0], [20.1, 628.0], [20.2, 628.0], [20.3, 628.0], [20.4, 628.0], [20.5, 628.0], [20.6, 628.0], [20.7, 629.0], [20.8, 629.0], [20.9, 629.0], [21.0, 629.0], [21.1, 629.0], [21.2, 629.0], [21.3, 629.0], [21.4, 629.0], [21.5, 629.0], [21.6, 629.0], [21.7, 629.0], [21.8, 629.0], [21.9, 630.0], [22.0, 630.0], [22.1, 630.0], [22.2, 630.0], [22.3, 630.0], [22.4, 630.0], [22.5, 630.0], [22.6, 630.0], [22.7, 630.0], [22.8, 630.0], [22.9, 630.0], [23.0, 630.0], [23.1, 630.0], [23.2, 631.0], [23.3, 631.0], [23.4, 631.0], [23.5, 631.0], [23.6, 631.0], [23.7, 631.0], [23.8, 631.0], [23.9, 631.0], [24.0, 631.0], [24.1, 631.0], [24.2, 631.0], [24.3, 631.0], [24.4, 632.0], [24.5, 632.0], [24.6, 632.0], [24.7, 632.0], [24.8, 632.0], [24.9, 632.0], [25.0, 632.0], [25.1, 632.0], [25.2, 632.0], [25.3, 632.0], [25.4, 632.0], [25.5, 632.0], [25.6, 632.0], [25.7, 633.0], [25.8, 633.0], [25.9, 633.0], [26.0, 633.0], [26.1, 633.0], [26.2, 633.0], [26.3, 633.0], [26.4, 633.0], [26.5, 633.0], [26.6, 633.0], [26.7, 633.0], [26.8, 633.0], [26.9, 633.0], [27.0, 634.0], [27.1, 634.0], [27.2, 634.0], [27.3, 634.0], [27.4, 634.0], [27.5, 634.0], [27.6, 634.0], [27.7, 634.0], [27.8, 634.0], [27.9, 634.0], [28.0, 634.0], [28.1, 634.0], [28.2, 635.0], [28.3, 635.0], [28.4, 635.0], [28.5, 635.0], [28.6, 635.0], [28.7, 635.0], [28.8, 635.0], [28.9, 635.0], [29.0, 635.0], [29.1, 635.0], [29.2, 635.0], [29.3, 635.0], [29.4, 635.0], [29.5, 636.0], [29.6, 636.0], [29.7, 636.0], [29.8, 636.0], [29.9, 636.0], [30.0, 636.0], [30.1, 636.0], [30.2, 636.0], [30.3, 636.0], [30.4, 636.0], [30.5, 636.0], [30.6, 636.0], [30.7, 637.0], [30.8, 637.0], [30.9, 637.0], [31.0, 637.0], [31.1, 637.0], [31.2, 637.0], [31.3, 637.0], [31.4, 637.0], [31.5, 637.0], [31.6, 637.0], [31.7, 637.0], [31.8, 637.0], [31.9, 638.0], [32.0, 638.0], [32.1, 638.0], [32.2, 638.0], [32.3, 638.0], [32.4, 638.0], [32.5, 638.0], [32.6, 638.0], [32.7, 638.0], [32.8, 638.0], [32.9, 638.0], [33.0, 638.0], [33.1, 639.0], [33.2, 639.0], [33.3, 639.0], [33.4, 639.0], [33.5, 639.0], [33.6, 639.0], [33.7, 639.0], [33.8, 639.0], [33.9, 639.0], [34.0, 639.0], [34.1, 639.0], [34.2, 639.0], [34.3, 639.0], [34.4, 640.0], [34.5, 640.0], [34.6, 640.0], [34.7, 640.0], [34.8, 640.0], [34.9, 640.0], [35.0, 640.0], [35.1, 640.0], [35.2, 640.0], [35.3, 640.0], [35.4, 640.0], [35.5, 640.0], [35.6, 641.0], [35.7, 641.0], [35.8, 641.0], [35.9, 641.0], [36.0, 641.0], [36.1, 641.0], [36.2, 641.0], [36.3, 641.0], [36.4, 641.0], [36.5, 641.0], [36.6, 641.0], [36.7, 641.0], [36.8, 641.0], [36.9, 641.0], [37.0, 641.0], [37.1, 642.0], [37.2, 642.0], [37.3, 642.0], [37.4, 642.0], [37.5, 642.0], [37.6, 642.0], [37.7, 642.0], [37.8, 642.0], [37.9, 642.0], [38.0, 642.0], [38.1, 642.0], [38.2, 642.0], [38.3, 642.0], [38.4, 642.0], [38.5, 643.0], [38.6, 643.0], [38.7, 643.0], [38.8, 643.0], [38.9, 643.0], [39.0, 643.0], [39.1, 643.0], [39.2, 643.0], [39.3, 643.0], [39.4, 643.0], [39.5, 643.0], [39.6, 643.0], [39.7, 643.0], [39.8, 643.0], [39.9, 644.0], [40.0, 644.0], [40.1, 644.0], [40.2, 644.0], [40.3, 644.0], [40.4, 644.0], [40.5, 644.0], [40.6, 644.0], [40.7, 644.0], [40.8, 644.0], [40.9, 644.0], [41.0, 644.0], [41.1, 644.0], [41.2, 644.0], [41.3, 645.0], [41.4, 645.0], [41.5, 645.0], [41.6, 645.0], [41.7, 645.0], [41.8, 645.0], [41.9, 645.0], [42.0, 645.0], [42.1, 645.0], [42.2, 645.0], [42.3, 645.0], [42.4, 645.0], [42.5, 645.0], [42.6, 645.0], [42.7, 646.0], [42.8, 646.0], [42.9, 646.0], [43.0, 646.0], [43.1, 646.0], [43.2, 646.0], [43.3, 646.0], [43.4, 646.0], [43.5, 646.0], [43.6, 646.0], [43.7, 646.0], [43.8, 646.0], [43.9, 646.0], [44.0, 646.0], [44.1, 647.0], [44.2, 647.0], [44.3, 647.0], [44.4, 647.0], [44.5, 647.0], [44.6, 647.0], [44.7, 647.0], [44.8, 647.0], [44.9, 647.0], [45.0, 647.0], [45.1, 647.0], [45.2, 647.0], [45.3, 647.0], [45.4, 647.0], [45.5, 648.0], [45.6, 648.0], [45.7, 648.0], [45.8, 648.0], [45.9, 648.0], [46.0, 648.0], [46.1, 648.0], [46.2, 648.0], [46.3, 648.0], [46.4, 648.0], [46.5, 648.0], [46.6, 648.0], [46.7, 648.0], [46.8, 648.0], [46.9, 648.0], [47.0, 648.0], [47.1, 649.0], [47.2, 649.0], [47.3, 649.0], [47.4, 649.0], [47.5, 649.0], [47.6, 649.0], [47.7, 649.0], [47.8, 649.0], [47.9, 649.0], [48.0, 649.0], [48.1, 649.0], [48.2, 649.0], [48.3, 649.0], [48.4, 649.0], [48.5, 649.0], [48.6, 650.0], [48.7, 650.0], [48.8, 650.0], [48.9, 650.0], [49.0, 650.0], [49.1, 650.0], [49.2, 650.0], [49.3, 650.0], [49.4, 650.0], [49.5, 650.0], [49.6, 650.0], [49.7, 650.0], [49.8, 650.0], [49.9, 650.0], [50.0, 651.0], [50.1, 651.0], [50.2, 651.0], [50.3, 651.0], [50.4, 651.0], [50.5, 651.0], [50.6, 651.0], [50.7, 651.0], [50.8, 651.0], [50.9, 651.0], [51.0, 651.0], [51.1, 651.0], [51.2, 651.0], [51.3, 651.0], [51.4, 651.0], [51.5, 652.0], [51.6, 652.0], [51.7, 652.0], [51.8, 652.0], [51.9, 652.0], [52.0, 652.0], [52.1, 652.0], [52.2, 652.0], [52.3, 652.0], [52.4, 652.0], [52.5, 652.0], [52.6, 652.0], [52.7, 652.0], [52.8, 652.0], [52.9, 652.0], [53.0, 653.0], [53.1, 653.0], [53.2, 653.0], [53.3, 653.0], [53.4, 653.0], [53.5, 653.0], [53.6, 653.0], [53.7, 653.0], [53.8, 653.0], [53.9, 653.0], [54.0, 653.0], [54.1, 653.0], [54.2, 653.0], [54.3, 653.0], [54.4, 653.0], [54.5, 654.0], [54.6, 654.0], [54.7, 654.0], [54.8, 654.0], [54.9, 654.0], [55.0, 654.0], [55.1, 654.0], [55.2, 654.0], [55.3, 654.0], [55.4, 654.0], [55.5, 654.0], [55.6, 654.0], [55.7, 654.0], [55.8, 654.0], [55.9, 655.0], [56.0, 655.0], [56.1, 655.0], [56.2, 655.0], [56.3, 655.0], [56.4, 655.0], [56.5, 655.0], [56.6, 655.0], [56.7, 655.0], [56.8, 655.0], [56.9, 655.0], [57.0, 655.0], [57.1, 655.0], [57.2, 655.0], [57.3, 656.0], [57.4, 656.0], [57.5, 656.0], [57.6, 656.0], [57.7, 656.0], [57.8, 656.0], [57.9, 656.0], [58.0, 656.0], [58.1, 656.0], [58.2, 656.0], [58.3, 656.0], [58.4, 656.0], [58.5, 656.0], [58.6, 656.0], [58.7, 657.0], [58.8, 657.0], [58.9, 657.0], [59.0, 657.0], [59.1, 657.0], [59.2, 657.0], [59.3, 657.0], [59.4, 657.0], [59.5, 657.0], [59.6, 657.0], [59.7, 657.0], [59.8, 657.0], [59.9, 657.0], [60.0, 657.0], [60.1, 658.0], [60.2, 658.0], [60.3, 658.0], [60.4, 658.0], [60.5, 658.0], [60.6, 658.0], [60.7, 658.0], [60.8, 658.0], [60.9, 658.0], [61.0, 658.0], [61.1, 658.0], [61.2, 658.0], [61.3, 659.0], [61.4, 659.0], [61.5, 659.0], [61.6, 659.0], [61.7, 659.0], [61.8, 659.0], [61.9, 659.0], [62.0, 659.0], [62.1, 659.0], [62.2, 659.0], [62.3, 659.0], [62.4, 659.0], [62.5, 660.0], [62.6, 660.0], [62.7, 660.0], [62.8, 660.0], [62.9, 660.0], [63.0, 660.0], [63.1, 660.0], [63.2, 660.0], [63.3, 660.0], [63.4, 660.0], [63.5, 660.0], [63.6, 660.0], [63.7, 661.0], [63.8, 661.0], [63.9, 661.0], [64.0, 661.0], [64.1, 661.0], [64.2, 661.0], [64.3, 661.0], [64.4, 661.0], [64.5, 661.0], [64.6, 661.0], [64.7, 661.0], [64.8, 662.0], [64.9, 662.0], [65.0, 662.0], [65.1, 662.0], [65.2, 662.0], [65.3, 662.0], [65.4, 662.0], [65.5, 662.0], [65.6, 662.0], [65.7, 662.0], [65.8, 662.0], [65.9, 663.0], [66.0, 663.0], [66.1, 663.0], [66.2, 663.0], [66.3, 663.0], [66.4, 663.0], [66.5, 663.0], [66.6, 663.0], [66.7, 663.0], [66.8, 663.0], [66.9, 664.0], [67.0, 664.0], [67.1, 664.0], [67.2, 664.0], [67.3, 664.0], [67.4, 664.0], [67.5, 664.0], [67.6, 664.0], [67.7, 664.0], [67.8, 664.0], [67.9, 664.0], [68.0, 665.0], [68.1, 665.0], [68.2, 665.0], [68.3, 665.0], [68.4, 665.0], [68.5, 665.0], [68.6, 665.0], [68.7, 665.0], [68.8, 665.0], [68.9, 666.0], [69.0, 666.0], [69.1, 666.0], [69.2, 666.0], [69.3, 666.0], [69.4, 666.0], [69.5, 666.0], [69.6, 666.0], [69.7, 666.0], [69.8, 667.0], [69.9, 667.0], [70.0, 667.0], [70.1, 667.0], [70.2, 667.0], [70.3, 667.0], [70.4, 667.0], [70.5, 667.0], [70.6, 667.0], [70.7, 667.0], [70.8, 668.0], [70.9, 668.0], [71.0, 668.0], [71.1, 668.0], [71.2, 668.0], [71.3, 668.0], [71.4, 668.0], [71.5, 668.0], [71.6, 668.0], [71.7, 669.0], [71.8, 669.0], [71.9, 669.0], [72.0, 669.0], [72.1, 669.0], [72.2, 669.0], [72.3, 669.0], [72.4, 669.0], [72.5, 669.0], [72.6, 670.0], [72.7, 670.0], [72.8, 670.0], [72.9, 670.0], [73.0, 670.0], [73.1, 670.0], [73.2, 670.0], [73.3, 670.0], [73.4, 670.0], [73.5, 671.0], [73.6, 671.0], [73.7, 671.0], [73.8, 671.0], [73.9, 671.0], [74.0, 671.0], [74.1, 671.0], [74.2, 671.0], [74.3, 672.0], [74.4, 672.0], [74.5, 672.0], [74.6, 672.0], [74.7, 672.0], [74.8, 672.0], [74.9, 672.0], [75.0, 673.0], [75.1, 673.0], [75.2, 673.0], [75.3, 673.0], [75.4, 673.0], [75.5, 673.0], [75.6, 674.0], [75.7, 674.0], [75.8, 674.0], [75.9, 674.0], [76.0, 674.0], [76.1, 674.0], [76.2, 675.0], [76.3, 675.0], [76.4, 675.0], [76.5, 675.0], [76.6, 676.0], [76.7, 676.0], [76.8, 676.0], [76.9, 676.0], [77.0, 676.0], [77.1, 676.0], [77.2, 677.0], [77.3, 677.0], [77.4, 677.0], [77.5, 677.0], [77.6, 677.0], [77.7, 678.0], [77.8, 678.0], [77.9, 678.0], [78.0, 678.0], [78.1, 679.0], [78.2, 679.0], [78.3, 679.0], [78.4, 679.0], [78.5, 680.0], [78.6, 680.0], [78.7, 680.0], [78.8, 680.0], [78.9, 681.0], [79.0, 681.0], [79.1, 681.0], [79.2, 682.0], [79.3, 682.0], [79.4, 682.0], [79.5, 682.0], [79.6, 683.0], [79.7, 683.0], [79.8, 683.0], [79.9, 684.0], [80.0, 684.0], [80.1, 684.0], [80.2, 685.0], [80.3, 685.0], [80.4, 685.0], [80.5, 686.0], [80.6, 686.0], [80.7, 687.0], [80.8, 687.0], [80.9, 687.0], [81.0, 688.0], [81.1, 688.0], [81.2, 689.0], [81.3, 689.0], [81.4, 689.0], [81.5, 690.0], [81.6, 690.0], [81.7, 691.0], [81.8, 691.0], [81.9, 692.0], [82.0, 692.0], [82.1, 693.0], [82.2, 693.0], [82.3, 694.0], [82.4, 694.0], [82.5, 694.0], [82.6, 695.0], [82.7, 695.0], [82.8, 696.0], [82.9, 697.0], [83.0, 697.0], [83.1, 698.0], [83.2, 698.0], [83.3, 699.0], [83.4, 699.0], [83.5, 700.0], [83.6, 700.0], [83.7, 701.0], [83.8, 701.0], [83.9, 702.0], [84.0, 702.0], [84.1, 703.0], [84.2, 704.0], [84.3, 704.0], [84.4, 705.0], [84.5, 705.0], [84.6, 706.0], [84.7, 706.0], [84.8, 707.0], [84.9, 707.0], [85.0, 708.0], [85.1, 708.0], [85.2, 709.0], [85.3, 709.0], [85.4, 710.0], [85.5, 711.0], [85.6, 711.0], [85.7, 712.0], [85.8, 712.0], [85.9, 713.0], [86.0, 713.0], [86.1, 714.0], [86.2, 714.0], [86.3, 715.0], [86.4, 715.0], [86.5, 715.0], [86.6, 716.0], [86.7, 716.0], [86.8, 717.0], [86.9, 717.0], [87.0, 717.0], [87.1, 718.0], [87.2, 718.0], [87.3, 719.0], [87.4, 719.0], [87.5, 719.0], [87.6, 720.0], [87.7, 720.0], [87.8, 721.0], [87.9, 721.0], [88.0, 721.0], [88.1, 722.0], [88.2, 722.0], [88.3, 723.0], [88.4, 723.0], [88.5, 724.0], [88.6, 725.0], [88.7, 725.0], [88.8, 726.0], [88.9, 726.0], [89.0, 727.0], [89.1, 727.0], [89.2, 727.0], [89.3, 728.0], [89.4, 728.0], [89.5, 729.0], [89.6, 729.0], [89.7, 730.0], [89.8, 730.0], [89.9, 730.0], [90.0, 731.0], [90.1, 731.0], [90.2, 732.0], [90.3, 732.0], [90.4, 733.0], [90.5, 733.0], [90.6, 734.0], [90.7, 734.0], [90.8, 735.0], [90.9, 735.0], [91.0, 736.0], [91.1, 736.0], [91.2, 736.0], [91.3, 737.0], [91.4, 737.0], [91.5, 738.0], [91.6, 738.0], [91.7, 739.0], [91.8, 739.0], [91.9, 740.0], [92.0, 740.0], [92.1, 741.0], [92.2, 741.0], [92.3, 741.0], [92.4, 742.0], [92.5, 742.0], [92.6, 743.0], [92.7, 743.0], [92.8, 744.0], [92.9, 744.0], [93.0, 745.0], [93.1, 745.0], [93.2, 745.0], [93.3, 746.0], [93.4, 746.0], [93.5, 747.0], [93.6, 748.0], [93.7, 748.0], [93.8, 749.0], [93.9, 750.0], [94.0, 750.0], [94.1, 751.0], [94.2, 751.0], [94.3, 752.0], [94.4, 752.0], [94.5, 753.0], [94.6, 754.0], [94.7, 754.0], [94.8, 755.0], [94.9, 756.0], [95.0, 756.0], [95.1, 757.0], [95.2, 758.0], [95.3, 758.0], [95.4, 759.0], [95.5, 760.0], [95.6, 760.0], [95.7, 761.0], [95.8, 762.0], [95.9, 762.0], [96.0, 763.0], [96.1, 764.0], [96.2, 764.0], [96.3, 765.0], [96.4, 766.0], [96.5, 766.0], [96.6, 767.0], [96.7, 768.0], [96.8, 768.0], [96.9, 769.0], [97.0, 770.0], [97.1, 771.0], [97.2, 771.0], [97.3, 772.0], [97.4, 773.0], [97.5, 774.0], [97.6, 774.0], [97.7, 775.0], [97.8, 776.0], [97.9, 777.0], [98.0, 778.0], [98.1, 778.0], [98.2, 779.0], [98.3, 780.0], [98.4, 781.0], [98.5, 782.0], [98.6, 784.0], [98.7, 785.0], [98.8, 786.0], [98.9, 787.0], [99.0, 789.0], [99.1, 790.0], [99.2, 793.0], [99.3, 796.0], [99.4, 798.0], [99.5, 802.0], [99.6, 809.0], [99.7, 816.0], [99.8, 828.0], [99.9, 845.0], [100.0, 914.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 4.0, "minX": 0.0, "maxY": 82504.0, "series": [{"data": [[0.0, 20.0], [300.0, 59.0], [600.0, 82504.0], [700.0, 16009.0], [100.0, 34.0], [200.0, 47.0], [400.0, 161.0], [800.0, 544.0], [900.0, 4.0], [500.0, 618.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 900.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 100000.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 1,500ms"], [1, "Requests having \nresponse time > 1,500ms and <= 3,000ms"], [2, "Requests having \nresponse time > 3,000ms"], [3, "Requests in error"]], "maxY": 100000.0, "series": [{"data": [[0.0, 100000.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 1,500ms", "isController": false}, {"data": [], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms and <= 3,000ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 3,000ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 4.9E-324, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 94.53241650294699, "minX": 1.67880138E12, "maxY": 100.0, "series": [{"data": [[1.67880174E12, 100.0], [1.67880156E12, 100.0], [1.67880204E12, 98.72266340867445], [1.67880186E12, 100.0], [1.67880168E12, 100.0], [1.67880138E12, 94.53241650294699], [1.67880198E12, 100.0], [1.6788018E12, 100.0], [1.6788015E12, 100.0], [1.67880144E12, 100.0], [1.67880192E12, 100.0], [1.67880162E12, 100.0]], "isOverall": false, "label": "ESB api test", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.67880204E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 142.25, "minX": 1.0, "maxY": 661.1232357934324, "series": [{"data": [[2.0, 274.0], [3.0, 291.0], [4.0, 295.0], [5.0, 319.0], [6.0, 320.0], [7.0, 317.0], [8.0, 336.0], [9.0, 342.0], [10.0, 347.0], [11.0, 360.0], [12.0, 377.0], [13.0, 384.0], [14.0, 383.0], [15.0, 389.0], [16.0, 388.0], [17.0, 393.0], [18.0, 142.25], [19.0, 180.0], [20.0, 185.33333333333331], [21.0, 245.0], [22.0, 203.33333333333331], [23.0, 203.33333333333331], [24.0, 254.5], [25.0, 198.33333333333331], [26.0, 220.33333333333331], [27.0, 228.33333333333331], [28.0, 203.66666666666669], [29.0, 261.5], [30.0, 206.33333333333331], [31.0, 214.0], [32.0, 285.0], [33.0, 234.33333333333331], [34.0, 302.0], [35.0, 306.0], [36.0, 308.0], [37.0, 311.0], [38.0, 259.6666666666667], [39.0, 264.6666666666667], [40.0, 401.5], [41.0, 345.8], [42.0, 356.3333333333333], [43.0, 380.0], [44.0, 258.3333333333333], [45.0, 303.0], [46.0, 304.5], [47.0, 347.0], [48.0, 335.0], [49.0, 375.0], [50.0, 391.0], [51.0, 387.0], [52.0, 267.75], [53.0, 371.3333333333333], [54.0, 334.75], [55.0, 374.0], [56.0, 392.75], [57.0, 297.6666666666667], [58.0, 380.6666666666667], [59.0, 343.75], [60.0, 422.5], [61.0, 351.25], [62.0, 392.8333333333333], [63.0, 442.57142857142856], [64.0, 397.5], [65.0, 444.5], [66.0, 449.66666666666663], [67.0, 396.6], [68.0, 434.5], [69.0, 464.07142857142856], [70.0, 346.0], [71.0, 477.75000000000006], [72.0, 446.1428571428571], [73.0, 471.3333333333333], [74.0, 409.0], [75.0, 441.4], [76.0, 498.5], [77.0, 521.75], [78.0, 555.6206896551723], [79.0, 579.7333333333333], [80.0, 461.25], [81.0, 571.7142857142858], [82.0, 553.4444444444445], [83.0, 538.7142857142858], [84.0, 473.5], [85.0, 541.7142857142857], [86.0, 556.0], [87.0, 571.5], [88.0, 599.125], [89.0, 554.2857142857143], [90.0, 494.0], [91.0, 604.0588235294118], [92.0, 583.8], [93.0, 456.6666666666667], [94.0, 575.875], [95.0, 561.6666666666666], [96.0, 596.1111111111111], [97.0, 565.8333333333334], [98.0, 521.5], [99.0, 609.0], [100.0, 661.1232357934324], [1.0, 267.0]], "isOverall": false, "label": "HTTP Request", "isController": false}, {"data": [[99.83979000000127, 660.1364799999961]], "isOverall": false, "label": "HTTP Request-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 3427.266666666667, "minX": 1.67880138E12, "maxY": 56745.333333333336, "series": [{"data": [[1.67880174E12, 29879.166666666668], [1.67880156E12, 31323.466666666667], [1.67880204E12, 27556.166666666668], [1.67880186E12, 29791.633333333335], [1.67880168E12, 30613.1], [1.67880138E12, 3427.266666666667], [1.67880198E12, 30087.9], [1.6788018E12, 30034.033333333333], [1.6788015E12, 31404.266666666666], [1.67880144E12, 31091.166666666668], [1.67880192E12, 30158.6], [1.67880162E12, 31299.9]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.67880174E12, 53989.583333333336], [1.67880156E12, 56599.333333333336], [1.67880204E12, 49792.083333333336], [1.67880186E12, 53831.416666666664], [1.67880168E12, 55315.75], [1.67880138E12, 6192.833333333333], [1.67880198E12, 54366.75], [1.6788018E12, 54269.416666666664], [1.6788015E12, 56745.333333333336], [1.67880144E12, 56179.583333333336], [1.67880192E12, 54494.5], [1.67880162E12, 56556.75]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.67880204E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 580.0569744597241, "minX": 1.67880138E12, "maxY": 678.0513052322323, "series": [{"data": [[1.67880174E12, 675.4443943661939], [1.67880156E12, 644.9355116079137], [1.67880204E12, 662.85888821014], [1.67880186E12, 678.0513052322323], [1.67880168E12, 660.1185527328713], [1.67880138E12, 580.0569744597241], [1.67880198E12, 671.7037037037036], [1.6788018E12, 672.8110077345551], [1.6788015E12, 643.1223198970837], [1.67880144E12, 649.810611802924], [1.67880192E12, 669.562290689887], [1.67880162E12, 645.0380767989645]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.67880204E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 579.9999999999998, "minX": 1.67880138E12, "maxY": 678.0189851960681, "series": [{"data": [[1.67880174E12, 675.4120563380303], [1.67880156E12, 644.9054170249354], [1.67880204E12, 662.8278558338432], [1.67880186E12, 678.0189851960681], [1.67880168E12, 660.0827009787753], [1.67880138E12, 579.9999999999998], [1.67880198E12, 671.6718138077646], [1.6788018E12, 672.7761461719567], [1.6788015E12, 643.0918739279567], [1.67880144E12, 649.773903627503], [1.67880192E12, 669.5312569770064], [1.67880162E12, 645.0059158868437]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.67880204E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.67880138E12, "maxY": 0.5402750491159143, "series": [{"data": [[1.67880174E12, 0.0030422535211267593], [1.67880156E12, 0.0034393809114359425], [1.67880204E12, 0.0], [1.67880186E12, 0.0030511922251101812], [1.67880168E12, 0.0025294182338062234], [1.67880138E12, 0.5402750491159143], [1.67880198E12, 0.0019022043191227475], [1.6788018E12, 0.002017711018944065], [1.6788015E12, 0.003644939965694682], [1.67880144E12, 0.0038982133188955096], [1.67880192E12, 0.0036838580040187514], [1.67880162E12, 0.003979778423147253]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.67880204E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 57.0, "minX": 1.67880138E12, "maxY": 914.0, "series": [{"data": [[1.67880174E12, 914.0], [1.67880156E12, 799.0], [1.67880204E12, 834.0], [1.67880186E12, 851.0], [1.67880168E12, 868.0], [1.67880138E12, 700.0], [1.67880198E12, 805.0], [1.6788018E12, 830.0], [1.6788015E12, 773.0], [1.67880144E12, 803.0], [1.67880192E12, 801.0], [1.67880162E12, 843.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.67880174E12, 755.0], [1.67880156E12, 672.0], [1.67880204E12, 746.0], [1.67880186E12, 757.0], [1.67880168E12, 717.0], [1.67880138E12, 666.0], [1.67880198E12, 748.0], [1.6788018E12, 750.0], [1.6788015E12, 671.0], [1.67880144E12, 678.0], [1.67880192E12, 745.0], [1.67880162E12, 672.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.67880174E12, 791.0], [1.67880156E12, 717.0], [1.67880204E12, 811.0], [1.67880186E12, 792.0], [1.67880168E12, 792.0], [1.67880138E12, 692.81], [1.67880198E12, 792.6200000000008], [1.6788018E12, 803.7800000000007], [1.6788015E12, 719.0], [1.67880144E12, 744.0], [1.67880192E12, 784.0], [1.67880162E12, 812.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.67880174E12, 773.0], [1.67880156E12, 681.0], [1.67880204E12, 767.0], [1.67880186E12, 778.0], [1.67880168E12, 752.0], [1.67880138E12, 687.0], [1.67880198E12, 765.0], [1.6788018E12, 771.0], [1.6788015E12, 685.0], [1.67880144E12, 694.0], [1.67880192E12, 762.0], [1.67880162E12, 684.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.67880174E12, 588.0], [1.67880156E12, 585.0], [1.67880204E12, 267.0], [1.67880186E12, 586.0], [1.67880168E12, 586.0], [1.67880138E12, 57.0], [1.67880198E12, 589.0], [1.6788018E12, 600.0], [1.6788015E12, 592.0], [1.67880144E12, 574.0], [1.67880192E12, 592.0], [1.67880162E12, 596.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.67880174E12, 661.0], [1.67880156E12, 644.0], [1.67880204E12, 654.0], [1.67880186E12, 662.0], [1.67880168E12, 652.0], [1.67880138E12, 642.0], [1.67880198E12, 657.0], [1.6788018E12, 656.0], [1.6788015E12, 641.0], [1.67880144E12, 647.0], [1.67880192E12, 656.0], [1.67880162E12, 643.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.67880204E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 179.0, "minX": 91.0, "maxY": 770.0, "series": [{"data": [[91.0, 440.0], [93.0, 179.0], [121.0, 770.0], [125.0, 651.0], [124.0, 715.5], [133.0, 699.0], [135.0, 694.0], [134.0, 706.0], [132.0, 728.0], [128.0, 720.0], [131.0, 749.0], [130.0, 681.0], [129.0, 752.0], [139.0, 668.0], [143.0, 660.0], [138.0, 680.0], [136.0, 693.0], [137.0, 722.0], [140.0, 718.0], [142.0, 731.0], [141.0, 669.0], [149.0, 659.0], [148.0, 670.0], [150.0, 666.0], [151.0, 661.0], [144.0, 667.0], [147.0, 663.0], [145.0, 672.0], [146.0, 683.5], [157.0, 638.0], [154.0, 652.0], [155.0, 647.0], [153.0, 654.0], [158.0, 635.0], [152.0, 660.0], [159.0, 630.0], [156.0, 642.0], [163.0, 618.0], [161.0, 625.0], [162.0, 623.5], [160.0, 629.0], [164.0, 615.0], [165.0, 613.0], [166.0, 613.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 166.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 179.0, "minX": 91.0, "maxY": 770.0, "series": [{"data": [[91.0, 440.0], [93.0, 179.0], [121.0, 770.0], [125.0, 651.0], [124.0, 715.5], [133.0, 699.0], [135.0, 694.0], [134.0, 706.0], [132.0, 728.0], [128.0, 720.0], [131.0, 749.0], [130.0, 681.0], [129.0, 752.0], [139.0, 668.0], [143.0, 660.0], [138.0, 680.0], [136.0, 693.0], [137.0, 722.0], [140.0, 717.5], [142.0, 730.5], [141.0, 669.0], [149.0, 659.0], [148.0, 670.0], [150.0, 666.0], [151.0, 661.0], [144.0, 667.0], [147.0, 663.0], [145.0, 672.0], [146.0, 683.5], [157.0, 638.0], [154.0, 652.0], [155.0, 647.0], [153.0, 654.0], [158.0, 635.0], [152.0, 660.0], [159.0, 630.0], [156.0, 642.0], [163.0, 618.0], [161.0, 625.0], [162.0, 623.0], [160.0, 629.0], [164.0, 615.0], [165.0, 613.0], [166.0, 613.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 166.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 18.633333333333333, "minX": 1.67880138E12, "maxY": 155.46666666666667, "series": [{"data": [[1.67880174E12, 147.91666666666666], [1.67880156E12, 155.06666666666666], [1.67880204E12, 134.75], [1.67880186E12, 147.48333333333332], [1.67880168E12, 151.55], [1.67880138E12, 18.633333333333333], [1.67880198E12, 148.95], [1.6788018E12, 148.68333333333334], [1.6788015E12, 155.46666666666667], [1.67880144E12, 153.91666666666666], [1.67880192E12, 149.3], [1.67880162E12, 154.95]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.67880204E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 16.966666666666665, "minX": 1.67880138E12, "maxY": 155.46666666666667, "series": [{"data": [[1.67880174E12, 147.91666666666666], [1.67880156E12, 155.06666666666666], [1.67880204E12, 136.41666666666666], [1.67880186E12, 147.48333333333332], [1.67880168E12, 151.55], [1.67880138E12, 16.966666666666665], [1.67880198E12, 148.95], [1.6788018E12, 148.68333333333334], [1.6788015E12, 155.46666666666667], [1.67880144E12, 153.91666666666666], [1.67880192E12, 149.3], [1.67880162E12, 154.95]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.67880204E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 16.966666666666665, "minX": 1.67880138E12, "maxY": 155.46666666666667, "series": [{"data": [[1.67880174E12, 147.91666666666666], [1.67880156E12, 155.06666666666666], [1.67880204E12, 136.41666666666666], [1.67880186E12, 147.48333333333332], [1.67880168E12, 151.55], [1.67880138E12, 16.966666666666665], [1.67880198E12, 148.95], [1.6788018E12, 148.68333333333334], [1.6788015E12, 155.46666666666667], [1.67880144E12, 153.91666666666666], [1.67880192E12, 149.3], [1.67880162E12, 154.95]], "isOverall": false, "label": "HTTP Request-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.67880204E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 16.966666666666665, "minX": 1.67880138E12, "maxY": 155.46666666666667, "series": [{"data": [[1.67880174E12, 147.91666666666666], [1.67880156E12, 155.06666666666666], [1.67880204E12, 136.41666666666666], [1.67880186E12, 147.48333333333332], [1.67880168E12, 151.55], [1.67880138E12, 16.966666666666665], [1.67880198E12, 148.95], [1.6788018E12, 148.68333333333334], [1.6788015E12, 155.46666666666667], [1.67880144E12, 153.91666666666666], [1.67880192E12, 149.3], [1.67880162E12, 154.95]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.67880204E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

