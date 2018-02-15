// Copyright 2017 The Kubernetes Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {Component, OnDestroy, OnInit} from '@angular/core';
import {PodDetail} from '@api/backendapi';
import {StateService} from '@uirouter/core';
import {Subscription} from 'rxjs/Subscription';
import {EndpointManager} from '../../../../common/services/resource/endpoint';

import {NamespacedResourceService} from '../../../../common/services/resource/resource';

@Component({
  selector: 'kd-pod-detail',
  templateUrl: './template.html',
})
export class PodDetailComponent implements OnInit, OnDestroy {
  private podSubscription_: Subscription;
  private podName_: string;
  pod: PodDetail;
  isInitialized = false;

  constructor(
      private readonly pod_: NamespacedResourceService<PodDetail>,
      private readonly state_: StateService) {}

  ngOnInit(): void {
    this.podName_ = this.state_.params.resourceName;
    this.podSubscription_ = this.pod_.get(EndpointManager.pod.detail(), this.podName_)
                                .startWith({})
                                .subscribe((d: PodDetail) => {
                                  this.pod = d;
                                  this.isInitialized = true;
                                });
  }

  ngOnDestroy(): void {
    this.podSubscription_.unsubscribe();
  }
}
