import "reflect-metadata";
import { container } from "inversify-props";

import { PostManager } from '~/services/post/postManager'
import { IPostService } from '~/services/post/IPostService'
import { ICertificateService } from '~/services/certificate/ICertificateService'
import { CertificateManager } from '~/services/certificate/certificateManager'
import { IEducationService } from '~/services/education/IEducationService'
import { EducationManager } from '~/services/education/educationManager'
import { IEvaluationService } from '~/services/evaluation/IEvaluationService'
import { EvaluationManager } from '~/services/evaluation/evaluationManager'
import { IExperienceService } from '~/services/experience/IExperienceService'
import { ExperienceManager } from '~/services/experience/experienceManager'
import { IProjectService } from '~/services/project/IProjectService'
import { ProjectManager } from '~/services/project/projectManager'
import { ISubscriberService } from '~/services/subscriber/ISubscriberService'
import { SubscriberManager } from '~/services/subscriber/subscriberManager'
import { ISuperhumanService } from '~/services/superhuman/ISuperhumanService'
import { SuperhumanManager } from '~/services/superhuman/superhumanManager'
import { IPageService } from '~/services/page/IPageService'
import { PageManager } from '~/services/page/pageManager'
import { IConstants } from '~/constants/IConstants'
import Constants from '~/constants/Constants'
import { IValidator } from '~/constants/IValidator'
import { ValidateManager } from '~/constants/validateManager'
import { IMessageService } from "~/services/message/IMessageService";
import { MessageManager } from "~/services/message/messageManager";
import { IHashtagService } from "~/services/hashtag/IHashtagService";
import { HashtagManager } from "~/services/hashtag/hashtagManager";

container.addSingleton<IPostService>(PostManager, 'IPostService');
container.addSingleton<ICertificateService>(CertificateManager, 'ICertificateService');
container.addSingleton<IEducationService>(EducationManager, 'IEducationService');
container.addSingleton<IEvaluationService>(EvaluationManager, 'IEvaluationService');
container.addSingleton<IExperienceService>(ExperienceManager, 'IExperienceService');
container.addSingleton<IProjectService>(ProjectManager, 'IProjectService');
container.addSingleton<ISubscriberService>(SubscriberManager, 'ISubscriberService');
container.addSingleton<ISuperhumanService>(SuperhumanManager, 'ISuperhumanService');
container.addSingleton<IPageService>(PageManager, "IPageService");
container.addSingleton<IConstants>(Constants, "IConstants");
container.addSingleton<IValidator>(ValidateManager, 'IValidator');
container.addSingleton<IMessageService>(MessageManager, "IMessageService");
container.addSingleton<IHashtagService>(HashtagManager, "IHashtagService");